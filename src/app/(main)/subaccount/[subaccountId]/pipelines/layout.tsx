// import { ChildrenProps } from "@/@types";
import BlurPage from "@/components/global/blur-page";
import React from "react";
import { ChildrenProps } from "../../../../../../@types";

const Layout = ({ children }: ChildrenProps) => {
    return <BlurPage>{children}</BlurPage>;
};

export default Layout;
