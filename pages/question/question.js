Page({
    data: {},
    copyBtn(o) {
        wx.setClipboardData({
            data: o.target.dataset.kefu,
            success: function(o) {
                wx.showToast({
                    title: "【客服微信】复制成功",
                    icon: "none",
                    mask: "true"
                });
            }
        });
    },
    onLoad(o) {
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