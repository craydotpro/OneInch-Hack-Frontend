
    import { createRef } from "react";
    const popupRoutes = [{
            name: "success",
            type: "modal",
            popup: require("../src/modules/trade/success.modal.tsx"),
            nodeRef: createRef()
        }];
    export default popupRoutes;
  