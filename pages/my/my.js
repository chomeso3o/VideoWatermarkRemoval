Page({
    data: {},
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