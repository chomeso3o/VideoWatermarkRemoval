Page({
    data: {
        analysis: []
    },
    copyBtn(a) {
        wx.setClipboardData({
            data: a.target.dataset.kefu,
            success: function(a) {
                wx.showToast({
                    title: "复制成功",
                    icon: "none",
                    mask: "true"
                });
            }
        });
    },
    clear_record() {
        this.setData({
            analysis: []
        }), wx.removeStorageSync("analysis");
    },
    onLoad(a) {
        let e = wx.getStorageSync("analysis");
        this.setData({
            analysis: e
        });
        let chaping = null;
            wx.createInterstitialAd && (chaping = wx.createInterstitialAd({
                adUnitId: "adunit-1f5844642a93579d"//插屏广告ID
            }), chaping.onLoad(() => {}), chaping.onError(o => {}), chaping.onClose(() => {})), chaping && chaping.show().catch(o => {
                console.error(o);
            });
    },
    onReady() {},
    onShow() {},
    onHide() {},
    onUnload() {},
    onPullDownRefresh() {},
    onReachBottom() {},
    onShareAppMessage() {}
});