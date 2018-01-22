export default {
    /**
     * @description                             返回元素相对浏览器窗口的位置
     * @param node                              元素节点
     * @returns {{top: number, left: number}}   元素相对浏览器窗口的位置
     */
    fixedTop: (node) => {
        if (!node) {
            return;
        }

        if (!node.getClientRects().length) {
            return {top: 0, left: 0};
        }

        const rect = node.getBoundingClientRect();
        const win = node.ownerDocument.defaultView;

        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
        };

    }
}