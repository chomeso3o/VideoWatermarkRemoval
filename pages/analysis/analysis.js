Page({
    data: {
        isaddmyxcx: 1,
        image: "",
        video: "",
        title: "",
        openSettingBtnHidden: !0
    },
    close() {
        this.setData({
            isaddmyxcx: 0
        });
    },
    onStartDownload() {
        let e = this;
        wx.getSetting({
            success: o => {
                void 0 === o.authSetting["scope.writePhotosAlbum"] ? wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: () => {
                        console.log("打开了授权"), e.downloadVideo();
                    },
                    fail: e => {
                        console.log("授权失败:", e);
                    }
                }) : o.authSetting["scope.writePhotosAlbum"] ? e.downloadVideo() : wx.openSetting({
                    success: o => {
                        console.log("openSetting成功回调:res", o), o.authSetting["scope.writePhotosAlbum"] && (console.log("授权了"), 
                        e.downloadVideo());
                    },
                    fail: e => {}
                });
            }
        });
    },
    downloadVideo() {
        wx.downloadFile({
            url: this.data.video,
            filePath: wx.env.USER_DATA_PATH + "/myvideoname.mp4",
            header: {
                "Content-Type": "video/mp4"
            },
            success: e => {
                console.log("downloadFile成功回调res:", e), wx.hideLoading();
                let o = e.filePath, t = wx.getFileSystemManager();
                wx.saveVideoToPhotosAlbum({
                    filePath: o,
                    success: e => {
                        wx.showToast({
                            title: "视频保存成功",
                            duration: 1e3,
                            icon: "none"
                        }), t.unlink({
                            filePath: wx.env.USER_DATA_PATH + "/myvideoname.mp4"
                        });
                    },
                    fail: e => {
                        t.unlink({
                            filePath: wx.env.USER_DATA_PATH + "/myvideoname.mp4"
                        }), wx.showToast({
                            title: "视频保存失败",
                            duration: 3e3,
                            icon: "none"
                        });
                    },
                    complete() {
                        wx.hideLoading();
                    }
                });
            },
            fail(e) {
                console.log("失败e", e), wx.showToast({
                    title: "视频保存失败",
                    duration: 3e3,
                    icon: "none"
                });
            },
            complete() {}
        });
    },
    downloadImg() {
        let e = this;
        wx.getSetting({
            success(o) {
                o.authSetting["scope.writePhotosAlbum"] ? e.saveImgToLocal() : wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success() {
                        e.saveImgToLocal();
                    },
                    fail() {
                        e.setData({
                            openSettingBtnHidden: !1
                        });
                    }
                });
            }
        });
    },
    saveImgToLocal: function(e) {
        let o = this.data.image;
        wx.downloadFile({
            url: o,
            success: function(e) {
                console.log(e), wx.saveImageToPhotosAlbum({
                    filePath: e.tempFilePath,
                    success: function(e) {
                        wx.showToast({
                            title: "保存成功",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    handleSetting: function(e) {
        let o = this;
        e.detail.authSetting["scope.writePhotosAlbum"] ? o.setData({
            openSettingBtnHidden: !0
        }) : o.setData({
            openSettingBtnHidden: !1
        });
    },
    copyBtn(e) {
        let o = e.target.dataset.copytxt;
        wx.setClipboardData({
            data: o,
            success: function(e) {
                wx.showToast({
                    title: "复制成功",
                    icon: "none",
                    mask: "true"
                });
            }
        });
    },
    onLoad(e) {
        let o = this;
        this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function(e) {
            console.log(e.data.image), o.setData({
                image: e.data.photo,
                video: e.data.url,
                title: e.data.title
            });
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