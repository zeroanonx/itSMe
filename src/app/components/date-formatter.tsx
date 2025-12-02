// 日期格式化组件：将字符串日期格式化为更友好的展示形式
import { parseISO, format } from "date-fns";

type Props = {
  // ISO 字符串形式的日期，例如 "2020-03-16"
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  // 使用 date-fns 格式化为 “March 16, 2020” 这种形式
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;
