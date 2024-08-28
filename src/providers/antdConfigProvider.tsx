import { ConfigProvider } from "antd";

type Props = {
  children: React.ReactNode;
};

export const AntdConfigProvider = ({ children }: Props) => {
  const THEME = {
    token: {
      colorPrimary: "var(--color-primary-default)",
      colorLink: "var(--color-primary-default)",
      colorText: "var(--color-text-light)",
      colorPrimaryHover: "var(--color-primary-default)",
      controlOutlineWidth: 1,
      controlOutline: "#3f51b5",
    },
  };

  return <ConfigProvider theme={THEME}>{children}</ConfigProvider>;
};
