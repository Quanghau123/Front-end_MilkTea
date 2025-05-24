import Payment from "@/screens/Payment";
import React, { Suspense } from "react";

const page = () => {
    return (
        <Suspense fallback={<div>Đang tải thanh toán...</div>}>
            <div>
                <Payment />
            </div>
        </Suspense>
    );
};

export default page;
