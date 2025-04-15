var videoAd = '';
!function() {
    getApp();
    Page({
        data: {
            isInput: 0,
            inputValue: ""
        },
        bindinput(e) {
            var t = e.detail.value;
            t.length > 0 && this.setData({
                isInput: 1,
                inputValue: t
            });
        },
        saveCache(e) {
            let t = wx.getStorageSync("analysis");
            t || (t = []), t.length >= 50 && t.splice(0, 1), t.push(e), wx.setStorageSync("analysis", t);
        },
        paste_and_content() {
            let e = this;
            wx.getClipboardData({
              success(t) {
                  if (console.log("解析内容", t.data), !t.data) return wx.showToast({
                      title: "未检测到剪切板内容",
                      icon: "none",
                      duration: 2e3
                  }), !1;
                  e.qushuiyin("", t.data);
              }
          });
            
        },
        getURLFromString(t) {
          var a = /(https?|ftp|file|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
          return a.test(t) ? t.match(a)[0] : '';
        },
        paste() {
            let e = this;
            wx.getClipboardData({
                success(t) {
                    e.setData({
                        inputValue: t.data,
                        isInput: 1
                    });
                }
            });
        },
        qushuiyin(e, t) {
            let a = this;
            
            let s = t || a.data.inputValue;
            let url = a.getURLFromString(s)
            if(!url){
              wx.showModal({
                  content: "未检测到作品链接，请检查复制内容",
                  confirmText: "确定",
                  success: function(a) {
                     if(a.confirm){
                      }	
                     }
                })
              return false;
            }
            console.log("观看激励视频，再解析",videoAd);
           
            if(!videoAd){
              videoAd.offClose();
					    videoAd.offError();
					    videoAd.onClose((res) => {
						    if (res && res.isEnded) {
							    wx.getClipboardData({
                    success(t) {
                      wx.showLoading({
                        title: "解析中..."
                      });
                        a.jiexi(s)
                    }
                });
						    } else {
                  wx.hideLoading(),
							    wx.showToast({
								    icon: 'none',
								    title: "中途关闭广告，解析失败！"
							    })
						  }
            })
            videoAd.onError((err) => {
              wx.hideLoading(),
						  wx.showToast({
							  icon: 'none',
							  title: "暂时无广告，请稍后再试"
						  })
					  })
              videoAd.show().catch(() => {
                // 失败重试
                videoAd.load()
                  .then(() => videoAd.show())
                  .catch(err => {
                    wx.hideLoading(),
                    console.error('激励视频 广告显示失败', err)
                  })
              })
            }
            else{
              wx.showLoading({
                title: "解析中..."
              });
              a.jiexi(s)
            }
        },
        jiexi(s){
          let a = this;
          console.log("一键去水印", s), wx.request({
            url: "https://api.wxshares.com/api/qsy/as",
            data: {
                key: "tMVSvRl5cOYaIGdiLzu8XvMfja",
                url: s
            },
            header: {
                "content-type": "application/json"
            },
            success(e) {
                wx.hideLoading(), console.log("服务器返回数据", e.data);
                let t = e.data;
                200 == t.code ? (console.log("解析成功打印数据", t.data), wx.navigateTo({
                    url: "/pages/analysis/analysis",
                    events: {
                        acceptDataFromOpenedPage: function(e) {
                            console.log(e);
                        },
                        someEvent: function(e) {
                            console.log(e);
                        }
                    },
                    success: function(e) {
                        a.setData({
                            inputValue: "",
                            isInput: 0
                        }), a.saveCache(s), e.eventChannel.emit("acceptDataFromOpenerPage", {
                            data: t.data
                        });
                    }
                })) : wx.showModal({
                    title: "解析失败",
                    content: "解析失败，可能是因为：1、链接错误或暂时不支持平台2、作品还未审核通过3、作品已经被删除了---如有问题，请联系我们的客服【o_8_8_8_8_8_8_8_8_0】",
                    success(e) {
                        e.confirm && a.copyBtn(1, "o_8_8_8_8_8_8_8_8_0");
                    }
                });
            }
        });
        },
        clear() {
            this.setData({
                inputValue: "",
                isInput: 0
            });
        },
        copyBtn(e, t) {
            let a = t || e.target.dataset.kefu;
            wx.setClipboardData({
                data: a,
                success: function(e) {
                    wx.showToast({
                        title: "【客服微信】复制成功",
                        icon: "none",
                        mask: "true"
                    });
                }
            });
        },
        onLoad() {
            wx.getUserProfile && this.setData({
                canIUseGetUserProfile: !0
            });
            let e = null;
            wx.createInterstitialAd && (e = wx.createInterstitialAd({
                adUnitId: "adunit-1f5844642a93579d"//插屏广告ID
            }), e.onLoad(() => {}), e.onError(e => {}), e.onClose(() => {})), e && e.show().catch(e => {
                console.error(e);
            });
            if(wx.createRewardedVideoAd){
              videoAd = wx.createRewardedVideoAd({
                adUnitId: "adunit-bf6c85886ae3a7ee"//激励广告ID
              })
              videoAd.onLoad(() => {})
              videoAd.onError((err) => {
                  console.error('激励视频光告加载失败', err)
              })
              videoAd.onClose((res) => {})
            }
        },
        getUserProfile(e) {
            wx.getUserProfile({
                desc: "展示用户信息",
                success: e => {
                    console.log(e), this.setData({
                        userInfo: e.userInfo,
                        hasUserInfo: !0
                    });
                }
            });
        },
        getUserInfo(e) {
            console.log(e), this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: !0
            });
        }
    });
}();