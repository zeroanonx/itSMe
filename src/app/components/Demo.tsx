// 示例组件：用于演示如何在文章（Markdown/MDX）中嵌入 React 组件
const Demo = () => {
  return (
    <div className="my-6 rounded-md border border-dashed border-blue-400 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-500/70 dark:bg-slate-900/40 dark:text-blue-200">
      <p className="font-semibold mb-1">
        这是一个在 MDX 中渲染的 React 组件 Demo
      </p>
      <p>你可以在文章正文中直接写 &lt;Demo /&gt; 来插入这块内容。</p>
    </div>
  );
};

export default Demo;
