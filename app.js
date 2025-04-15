App({
    onLaunch() {
        const n = wx.getStorageSync("logs") || [];
        n.unshift(Date.now()), wx.setStorageSync("logs", n), wx.login({
            success: n => {}
        });
    },
    globalData: {
        userInfo: null
    }
});