function shareFuelActivity() {
    var that = this, url = ""
    U.loading();
    if (new Date('2020-01-27 23:59:59') >= new Date()) {
        app.ajaxGetNeedLogin('/scholarship/shared/image', {}, function (res) {
            url = res.data.value;
            U.unLoading();
            if (!url) {
                return
            }
            var downLoader = plus.downloader.createDownload(url, {  // 创建下载
                method: 'GET'
            }, function (download, status) {
   
                if (status == 200) {
                    var fileName = download.filename;
                    that.shareAction(plus.io.convertLocalFileSystemURL(fileName)); // 转化为本地图片

                } else {
                    that.shareAction()
                }
            });
            downLoader.start();
        })

    } else {


    }
}

 function shareAction(pictures) {
    var that = this;
    var msg = {
        type: 'image',
        extra: {
            scene: "WXSceneTimeline" // 分享到朋友圈
        },
        pictures: [pictures]   // 分享图片
    };
    if (!window.plus) {
        $.toast("获取分享服务失败");
        return;
    }
    plus.share.getServices(function (s) {
        var share = null;
        for (var i in s) {
            var t = s[i];
            if (t.id == "weixin") {
                share = t;
            }
        }
        if (!share) {
            app.toast("无法获取微信分享服务");
            return;
        }

        if (share.authenticated) {
            share.send(msg, function () {
                app.toast('分享成功');
                return;
            }, function (e) {
            }
            );
            return;
        }
        app.toast("您的手机无法分享到朋友圈，请检查您的手机是否安装了微信应用");
    }, function (e) {
        // app.actionRecord(mobile, "ERROR", "获取分享服务列表失败:" + e.message);
        app.toast("获取分享服务列表失败：" + e.message);
    });
}

// 文档地址： https://www.html5plus.org/doc/zh_cn/android.html