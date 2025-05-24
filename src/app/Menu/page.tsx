import Menu from "@/screens/Menu";
import React, { Suspense } from "react";

const page = () => {
    return (
        <Suspense fallback={<div>Đang tải menu...</div>}>
            <div>
                <Menu />
            </div>
        </Suspense>
    );
};

export default page;
