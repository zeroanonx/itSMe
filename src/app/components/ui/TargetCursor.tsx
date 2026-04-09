"use client";

import React, { useEffect, useRef, memo, useCallback, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";

interface TargetCursorProps {
  targetSelector?: string;
  cornerAnimationDuration?: number;
  onCursorStateChange?: (isOverTarget: boolean) => void;
}

const styles = [
  "color: #FF6B00",
  "font-size: 20px",
  "font-family: sans-serif",
  "padding: 10px 20px",
].join(";");

const CursorStyles = styled.div`
  @media screen and (max-width: 480px) {
    .cursor-container,
    .target-cursor {
      display: none !important;
    }
  }

  .cursor-container,
  .target-cursor {
    pointer-events: none;
  }

  .cursor__ball--big,
  .cursor__ball--small {
    opacity: 0;
  }

  .cursor__ball {
    position: fixed;
    top: 0;
    left: 0;
    mix-blend-mode: difference;
    z-index: 99999;
  }

  .cursor__ball circle {
    fill: white;
  }

  .target-cursor {
    mix-blend-mode: difference;
    z-index: 99998;
  }

  .target-cursor .bg-primary {
    background-color: white;
  }

  .target-cursor .border-primary {
    border-color: white;
  }
`;

interface CornerQuickToSet {
  x: (value: number) => gsap.core.Tween;
  y: (value: number) => gsap.core.Tween;
}

export const TargetCursor = memo(
  ({
    targetSelector = ".cursor-target",
    cornerAnimationDuration = 0.15,
    onCursorStateChange,
  }: TargetCursorProps) => {
    console.log("%cMade by https://zeroanon.com ", styles);

    // Refs
    const cursorContainerRef = useRef<HTMLDivElement>(null);
    const bigBallRef = useRef<HTMLDivElement>(null);
    const smallBallRef = useRef<HTMLDivElement>(null);
    const targetCursorRef = useRef<HTMLDivElement>(null);
    const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);

    // 状态和位置
    const isOverTargetRef = useRef(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const lastMousePosition = useRef({ x: 0, y: 0 }); // 上次鼠标位置
    const animationFrameId = useRef<number | null>(null);
    const updateScheduledRef = useRef(false);

    // 用于记录上次检测到的目标元素
    const lastTargetRef = useRef<Element | null>(null);
    // 当悬停在 .no-cursor 时抑制自定义光标的显示
    const suppressCursorRef = useRef(false);
    // 存储进入 .no-cursor 前的光标状态，便于离开后恢复（需要时可用）
    const savedStateRef = useRef<{
      wasOverTarget: boolean;
      lastTarget: Element | null;
    }>({
      wasOverTarget: false,
      lastTarget: null,
    });
    const bigBallXRef = useRef<((value: number) => gsap.core.Tween) | null>(
      null
    );
    const bigBallYRef = useRef<((value: number) => gsap.core.Tween) | null>(
      null
    );
    const smallBallXRef = useRef<((value: number) => gsap.core.Tween) | null>(
      null
    );
    const smallBallYRef = useRef<((value: number) => gsap.core.Tween) | null>(
      null
    );
    const cornerSettersRef = useRef<CornerQuickToSet[]>([]);

    // 检查鼠标位置下的元素是否匹配选择器
    const checkElementUnderMouse = useCallback(
      (x: number, y: number): Element | null => {
        try {
          const elements = document.elementsFromPoint(x, y);

          for (const element of elements) {
            if (element.matches(targetSelector)) {
              return element;
            }
            const closest = element.closest(targetSelector);
            if (closest) {
              return closest;
            }
          }
        } catch (error) {
          console.warn("Error checking element under mouse:", error);
        }

        return null;
      },
      [targetSelector]
    );

    // 检查鼠标位置下是否存在禁止自定义光标的元素（例如 .no-cursor）
    const checkNoCursorUnderMouse = useCallback((x: number, y: number) => {
      try {
        const elements = document.elementsFromPoint(x, y);
        for (const element of elements) {
          const noCursor = (element as Element).closest(".no-cursor");
          if (noCursor) return true;
        }
      } catch (error) {
        console.warn("Error checking no-cursor under mouse:", error);
      }
      return false;
    }, []);

    // 更新角点位置
    const updateCorners = useCallback(
      (target: Element, x: number, y: number) => {
        if (!cornersRef.current || cornerSettersRef.current.length === 0)
          return;

        const rect = target.getBoundingClientRect();
        const { borderWidth, cornerSize, parallaxStrength } = {
          borderWidth: 3,
          cornerSize: 12,
          parallaxStrength: 0.00005,
        };

        // 计算角点位置
        const tlOffset = {
          x: rect.left - x - borderWidth,
          y: rect.top - y - borderWidth,
        };
        const trOffset = {
          x: rect.right - x + borderWidth - cornerSize,
          y: rect.top - y - borderWidth,
        };
        const brOffset = {
          x: rect.right - x + borderWidth - cornerSize,
          y: rect.bottom - y + borderWidth - cornerSize,
        };
        const blOffset = {
          x: rect.left - x - borderWidth,
          y: rect.bottom - y + borderWidth - cornerSize,
        };

        // 视差效果
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const mouseOffsetX = (x - targetCenterX) * parallaxStrength;
        const mouseOffsetY = (y - targetCenterY) * parallaxStrength;

        tlOffset.x += mouseOffsetX;
        tlOffset.y += mouseOffsetY;
        trOffset.x += mouseOffsetX;
        trOffset.y += mouseOffsetY;
        brOffset.x += mouseOffsetX;
        brOffset.y += mouseOffsetY;
        blOffset.x += mouseOffsetX;
        blOffset.y += mouseOffsetY;

        // 更新角点位置
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        cornerSettersRef.current.forEach((corner, index) => {
          corner.x(offsets[index].x);
          corner.y(offsets[index].y);
        });
      },
      [cornerAnimationDuration]
    );

    // 更新普通光标位置
    const updateNormalCursor = useCallback((x: number, y: number) => {
      if (
        !bigBallXRef.current ||
        !bigBallYRef.current ||
        !smallBallXRef.current ||
        !smallBallYRef.current
      ) {
        return;
      }

      bigBallXRef.current(x - 30);
      bigBallYRef.current(y - 30);
      smallBallXRef.current(x - 7);
      smallBallYRef.current(y - 7);

      if (bigBallRef.current) {
        gsap.set(bigBallRef.current, { opacity: 1 });
      }

      if (smallBallRef.current) {
        gsap.set(smallBallRef.current, { opacity: 1 });
      }
    }, []);

    // 切换到目标光标
    const switchToTargetCursor = useCallback(
      (x: number, y: number, target: Element) => {
        // 显示目标光标
        if (targetCursorRef.current) {
          gsap.killTweensOf(targetCursorRef.current);
          gsap.set(targetCursorRef.current, {
            x: x,
            y: y,
            display: "block",
            opacity: 0,
          });

          gsap.to(targetCursorRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          });
        }

        // 隐藏普通光标
        if (cursorContainerRef.current) {
          gsap.killTweensOf(cursorContainerRef.current);
          gsap.to(cursorContainerRef.current, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out",
            onComplete: () => {
              if (cursorContainerRef.current) {
                gsap.set(cursorContainerRef.current, { display: "none" });
              }
            },
          });
        }

        // 更新角点位置
        updateCorners(target, x, y);
      },
      [updateCorners]
    );

    // 切换到普通光标
    const switchToNormalCursor = useCallback(
      (x: number, y: number) => {
        // 隐藏目标光标
        if (targetCursorRef.current) {
          gsap.killTweensOf(targetCursorRef.current);
          gsap.to(targetCursorRef.current, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out",
            onComplete: () => {
              if (targetCursorRef.current) {
                gsap.set(targetCursorRef.current, { display: "none" });
              }
            },
          });
        }

        // 显示普通光标
        if (cursorContainerRef.current) {
          gsap.killTweensOf(cursorContainerRef.current);
          gsap.set(cursorContainerRef.current, {
            display: "block",
            opacity: 0,
          });

          gsap.to(cursorContainerRef.current, {
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          });

          // 更新普通光标位置
          updateNormalCursor(x, y);
        }
      },
      [updateNormalCursor]
    );

    const processPointerRef = useRef<(() => void) | null>(null);

    const schedulePointerUpdate = useCallback(() => {
      const processPointer = processPointerRef.current;

      if (updateScheduledRef.current || !processPointer) return;

      updateScheduledRef.current = true;
      animationFrameId.current = requestAnimationFrame(() => {
        updateScheduledRef.current = false;
        animationFrameId.current = null;
        processPointer();
      });
    }, []);

    // 处理鼠标移动 - 合并为每帧最多一次状态计算
    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        const newX = e.clientX;
        const newY = e.clientY;

        // 只有位置变化超过1px才标记需要更新（减少不必要的计算）
        if (
          Math.abs(newX - lastMousePosition.current.x) > 1 ||
          Math.abs(newY - lastMousePosition.current.y) > 1
        ) {
          mousePosition.current = { x: newX, y: newY };
          lastMousePosition.current = { x: newX, y: newY };
          schedulePointerUpdate();
        }
      },
      [schedulePointerUpdate]
    );

    // 主更新：只在鼠标位置变化时执行一次
    const processPointerPosition = useCallback(() => {
      const { x, y } = mousePosition.current;

      // 处理 .no-cursor 的进入/退出逻辑：进入时抑制并隐藏光标，离开时恢复上次动画状态
      const isOnNoCursor = checkNoCursorUnderMouse(x, y);

      if (suppressCursorRef.current) {
        // 仍在抑制中：如果已经离开 .no-cursor，则恢复显示并切回合适的光标
        if (!isOnNoCursor) {
          suppressCursorRef.current = false;
          const targetUnderMouse = checkElementUnderMouse(x, y);

          if (targetUnderMouse) {
            isOverTargetRef.current = true;
            lastTargetRef.current = targetUnderMouse;
            if (onCursorStateChange) onCursorStateChange(true);
            switchToTargetCursor(x, y, targetUnderMouse);
          } else {
            isOverTargetRef.current = false;
            lastTargetRef.current = null;
            if (onCursorStateChange) onCursorStateChange(false);
            switchToNormalCursor(x, y);
          }
          return;
        }
      } else if (isOnNoCursor) {
        // 刚进入 .no-cursor：保存当前状态，抑制自定义光标显示并隐藏所有动画
        savedStateRef.current = {
          wasOverTarget: isOverTargetRef.current,
          lastTarget: lastTargetRef.current,
        };
        suppressCursorRef.current = true;

        if (isOverTargetRef.current && onCursorStateChange) {
          onCursorStateChange(false);
        }

        isOverTargetRef.current = false;
        lastTargetRef.current = null;

        // 隐藏目标光标
        if (targetCursorRef.current) {
          gsap.killTweensOf(targetCursorRef.current);
          gsap.to(targetCursorRef.current, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
              if (targetCursorRef.current)
                gsap.set(targetCursorRef.current, { display: "none" });
            },
          });
        }

        // 隐藏普通光标
        if (cursorContainerRef.current) {
          gsap.killTweensOf(cursorContainerRef.current);
          gsap.to(cursorContainerRef.current, {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
              if (cursorContainerRef.current)
                gsap.set(cursorContainerRef.current, { display: "none" });
            },
          });
        }

        return;
      }

      // 检查鼠标位置下的元素
      const targetUnderMouse = checkElementUnderMouse(x, y);
      const wasOverTarget = isOverTargetRef.current;
      const isNowOverTarget = !!targetUnderMouse;

      // 获取上次的目标元素
      const lastTarget = lastTargetRef.current;

      // 如果目标元素发生变化（包括从有到无，从无到有，或换了一个目标）
      const targetChanged =
        (isNowOverTarget && !wasOverTarget) || // 从无到有
        (!isNowOverTarget && wasOverTarget) || // 从有到无
        (isNowOverTarget && wasOverTarget && targetUnderMouse !== lastTarget); // 换目标

      if (targetChanged) {
        isOverTargetRef.current = isNowOverTarget;
        lastTargetRef.current = targetUnderMouse;

        // 通知外部状态变化
        if (onCursorStateChange) {
          onCursorStateChange(isNowOverTarget);
        }

        if (isNowOverTarget && targetUnderMouse) {
          // 切换到目标光标
          switchToTargetCursor(x, y, targetUnderMouse);
        } else {
          // 切换到普通光标
          switchToNormalCursor(x, y);
        }
      }

      // 如果已经在目标上，更新角点位置
      if (isNowOverTarget && targetUnderMouse && targetCursorRef.current) {
        // 更新目标光标位置
        gsap.set(targetCursorRef.current, {
          x: x,
          y: y,
        });

        // 更新角点位置
        updateCorners(targetUnderMouse, x, y);
      }
      // 如果不在目标上，更新普通光标位置
      else if (!isNowOverTarget) {
        updateNormalCursor(x, y);
      }
    }, [
      checkElementUnderMouse,
      checkNoCursorUnderMouse,
      onCursorStateChange,
      switchToTargetCursor,
      switchToNormalCursor,
      updateCorners,
      updateNormalCursor,
    ]);

    processPointerRef.current = processPointerPosition;

    useEffect(() => {
      // 初始化
      if (targetCursorRef.current) {
        cornersRef.current =
          targetCursorRef.current.querySelectorAll<HTMLDivElement>(
            ".target-cursor-corner"
          );

        // 初始隐藏目标光标
        gsap.set(targetCursorRef.current, {
          opacity: 0,
          display: "none",
        });
      }

      if (bigBallRef.current) {
        bigBallXRef.current = gsap.quickTo(bigBallRef.current, "x", {
          duration: 0.6,
          ease: "power2.out",
        });
        bigBallYRef.current = gsap.quickTo(bigBallRef.current, "y", {
          duration: 0.6,
          ease: "power2.out",
        });
      }

      if (smallBallRef.current) {
        smallBallXRef.current = gsap.quickTo(smallBallRef.current, "x", {
          duration: 0.1,
          ease: "power2.out",
        });
        smallBallYRef.current = gsap.quickTo(smallBallRef.current, "y", {
          duration: 0.1,
          ease: "power2.out",
        });
      }

      if (cornersRef.current) {
        cornerSettersRef.current = Array.from(cornersRef.current).map(
          (corner) => ({
            x: gsap.quickTo(corner, "x", {
              duration: cornerAnimationDuration,
              ease: "power2.out",
            }),
            y: gsap.quickTo(corner, "y", {
              duration: cornerAnimationDuration,
              ease: "power2.out",
            }),
          })
        );
      }

      // 设置初始鼠标位置
      mousePosition.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      // 添加鼠标移动监听
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        // 清理
        window.removeEventListener("mousemove", handleMouseMove);

        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        updateScheduledRef.current = false;
        cornerSettersRef.current = [];
        bigBallXRef.current = null;
        bigBallYRef.current = null;
        smallBallXRef.current = null;
        smallBallYRef.current = null;

        // 清理所有动画
        if (cursorContainerRef.current) {
          gsap.killTweensOf(cursorContainerRef.current);
        }
        if (targetCursorRef.current) {
          gsap.killTweensOf(targetCursorRef.current);
        }
        if (bigBallRef.current) {
          gsap.killTweensOf(bigBallRef.current);
        }
        if (smallBallRef.current) {
          gsap.killTweensOf(smallBallRef.current);
        }
        if (cornersRef.current) {
          gsap.killTweensOf(Array.from(cornersRef.current));
        }
      };
    }, [cornerAnimationDuration, handleMouseMove]);

    return (
      <CursorStyles>
        {/* 普通光标容器 */}
        <div
          ref={cursorContainerRef}
          className="cursor-container cursor"
          style={{ display: "block" }}
        >
          <div ref={bigBallRef} className="cursor__ball cursor__ball--big">
            <svg height="60" width="60">
              <circle cx="30" cy="30" r="20" strokeWidth="0" />
            </svg>
          </div>
          <div ref={smallBallRef} className="cursor__ball cursor__ball--small">
            <svg height="14" width="14">
              <circle cx="7" cy="7" r="5" strokeWidth="0" />
            </svg>
          </div>
        </div>

        {/* 目标光标 */}
        <div
          ref={targetCursorRef}
          className="target-cursor fixed left-0 top-0"
          style={{
            willChange: "transform",
          }}
        >
          <div
            className="absolute bg-primary rounded-full w-1 h-1"
            style={{
              willChange: "transform",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute border-2 border-primary border-r-0 border-b-0 w-3 h-3 target-cursor-corner"
            style={{
              willChange: "transform",
              left: "50%",
              top: "50%",
              transform: "translate(-150%, -150%)",
            }}
          />
          <div
            className="absolute border-2 border-primary border-b-0 border-l-0 w-3 h-3 target-cursor-corner"
            style={{
              willChange: "transform",
              left: "50%",
              top: "50%",
              transform: "translate(50%, -150%)",
            }}
          />
          <div
            className="absolute border-2 border-primary border-t-0 border-l-0 w-3 h-3 target-cursor-corner"
            style={{
              willChange: "transform",
              left: "50%",
              top: "50%",
              transform: "translate(50%, 50%)",
            }}
          />
          <div
            className="absolute border-2 border-primary border-t-0 border-r-0 w-3 h-3 target-cursor-corner"
            style={{
              willChange: "transform",
              left: "50%",
              top: "50%",
              transform: "translate(-150%, 50%)",
            }}
          />
        </div>
      </CursorStyles>
    );
  }
);

export const useCursorState = () => {
  const [isOverTarget, setIsOverTarget] = useState(false);

  const handleCursorStateChange = useCallback((state: boolean) => {
    setIsOverTarget(state);
  }, []);

  return { isOverTarget, onCursorStateChange: handleCursorStateChange };
};
