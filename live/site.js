var rtv = {
  'offset': 0x0,
  'preinit': async function () {
    $("body").append($("<div />", {
      'id': 'container'
    }).append(this.menu.spawn()));
    await this.config.init();
    switch (location.hash.substring(0x1)) {
      case "?custom":
        rtv.guide.channels.custom.open(true);
        break;
      default:
        break;
    }
    this.init();
  },
  'about': function () {
    $("<div title=\"About MY TV\"></div>").dialog({
      'autoOpen': true,
      'height': "auto",
      'width': "auto",
      'modal': true,
      'buttons': {
        "Clear Local Storage": function () {
          localStorage.clear();
          location.reload();
        }
      },
      'open': function (_0xe32918, _0x36d5df) {
        $(this).parent().find(".ui-dialog-title").prepend("<img src='favicon.png' style='display:inline-block'/> ");
      },
      'close': function () {}
    });
    $("<div title=\"About MY TV\"></div>").find("button").button();
  },
  'config': {
    'init': async function () {
      this.load();
      this.local();
      this.customs();
      await this.repos();
      this.save();
    },
    'local': function () {
      if (!this.cache.playlists || this.cache.playlists.length == 0x0) {
        console.warn("Loaded config.cache.playlists did not exist or was empty, setting default.");
        this.cache.playlists = this.defaultPlaylists;
      }
    },
    'customs': function () {
      var _0x58e681 = [];
      for (i in rtv.player.cached_playlists) {
        if (/^custom\d+$/.test(i)) {
          delete rtv.player.cached_playlists[i];
        }
      }
      if (localStorage.rtvCustomPlaylists && localStorage.rtvCustomPlaylists.length > 0x0) {
        $.each(JSON.parse(localStorage.rtvCustomPlaylists), function (_0x5c11ed, _0x1bd01c) {
          rtv.player.playlist.generate({
            'name': "custom" + _0x5c11ed,
            'list': _0x1bd01c
          });
          _0x58e681.push("custom" + _0x5c11ed);
        });
      }
      this.cache.customs = _0x58e681;
      return _0x58e681;
    },
    'cache': {},
    'repoCache': {},
    'config': {},
    'load': function () {
      if (localStorage.rtvConfig) {
        this.cache = $.extend(this.cache, JSON.parse(localStorage.rtvConfig));
      }
    },
    'save': function () {
      localStorage.rtvConfig = JSON.stringify(this.cache);
    },
    'repos': async function () {
      var _0x49ed08 = this.cache.repos || ['repo.json'];
      this.cache.repos = _0x49ed08;
      for (repo of _0x49ed08) {
        try {
          console.log("Loading " + repo);
          var _0x3a84ee = await $.ajax({
            'dataType': "json",
            'url': repo
          }).then(_0x524bbc => typeof _0x524bbc === "object" ? _0x524bbc : JSON.parse(_0x524bbc));
          _0x3a84ee.self = new URL(repo, document.baseURI).href;
          _0x3a84ee.prefix = _0x3a84ee.self.substr(0x0, _0x3a84ee.self.lastIndexOf('/') + 0x1);
          _0x3a84ee.local = new URL(repo, document.baseURI).origin == new URL(document.baseURI).origin;
          this.repoCache[_0x3a84ee.id] = _0x3a84ee;
          _0x3a84ee.defaultPlaylists = _0x3a84ee.defaultPlaylists.map(_0x123597 => _0x3a84ee.id + ':' + _0x123597);
          $.extend(this.defaultPlaylists, _0x3a84ee.defaultPlaylists);
        } catch (_0x368d0c) {
          console.error("Could not load " + repo, _0x368d0c);
        }
      }
    },
    'defaultPlaylists': []
  },
  'init': function (_0x4060e1) {
    this.player.create(_0x4060e1);
  },
  'player': {
    'players': [],
    'findNeedle': function (_0x1f0d0a) {
      var _0x4cd3e2 = _0x1f0d0a.info.url;
      var _0x49a187 = _0x4cd3e2.replace(/(\.())+$/ig, '');
      var _0x3ddfb3 = rtv.config.defaultPlaylists;
      var _0x35d7ff = -0x1;
      var _0x46615f = '';
      var _0x1535cc = false;
      while (_0x3ddfb3.length !== 0x1) {
        var _0x495ce6 = [];
        _0x46615f = _0x49a187.split('/').splice(_0x35d7ff).join('/').toLowerCase();
        _0x3ddfb3.find(function (_0x24c53a) {
          if (_0x24c53a.toLowerCase().indexOf(_0x46615f) >= 0x0) {
            _0x495ce6.push(_0x24c53a);
          }
        });
        if (_0x35d7ff < -0xa && _0x495ce6.length == _0x3ddfb3.length) {
          console.warn("stalemate", _0x46615f);
          return _0x46615f;
          break;
        }
        if (_0x1535cc == false && _0x495ce6.length == 0x2) {
          console.warn("collision? expanding needle", _0x495ce6);
          _0x1535cc = true;
          _0x35d7ff = -0x1;
          _0x49a187 = _0x4cd3e2;
        } else {
          _0x3ddfb3 = _0x495ce6;
          _0x35d7ff--;
        }
      }
      return _0x46615f;
    },
    'create': function (_0x4a79a9) {
      var _0x41f209 = localStorage.rtvLastPlaylist;
      if ($.inArray(_0x41f209, rtv.config.cache.playlists) == -0x1 && $.inArray(_0x41f209, rtv.config.cache.customs) == -0x1) {
        console.warn("Last playlist, \"" + _0x41f209 + "\", is not in config cache. Ignoring.");
        _0x41f209 = false;
      }
      var _0x57e85c = location.hash.substring(0x1);
      var _0x4518e3 = rtv.config.defaultPlaylists;
      _0x57e85c = _0x57e85c.length > 0x0 ? _0x4518e3.find(function (_0x3fa157) {
        return _0x3fa157.toLowerCase().indexOf(_0x57e85c.toLowerCase()) >= 0x0;
      }) : false;
      if (_0x57e85c && rtv.config.cache.playlists.indexOf(_0x57e85c) < 0x0) {
        rtv.config.cache.playlists.push(_0x57e85c);
      }
      var _0x10be74 = _0x4a79a9 || _0x57e85c || _0x41f209 || rtv.config.cache.playlists[Math.floor(Math.random() * rtv.config.cache.playlists.length)];
      var _0x4d6880 = this;
      $.each(rtv.config.cache.playlists.concat(rtv.config.cache.customs), function (_0x21bedf, _0x5909f4) {
        var _0x558e97 = _0x5909f4 == _0x10be74 ? function () {
          localStorage.rtvLastPlaylist = _0x10be74;
          _0x4d6880.spawn(_0x5909f4);
        } : false;
        var [_0xba121c, ..._0x57af84] = _0x5909f4.split(':');
        var _0x57af84 = _0x57af84.join(':');
        if (rtv.config.repoCache.hasOwnProperty(_0xba121c)) {
          _0x5909f4 = /^\w{1,6}:/.test(_0x57af84) ? _0x57af84 : rtv.config.repoCache[_0xba121c].prefix + _0x57af84;
        } else {
          console.error("Unable to find repo " + _0xba121c + " for " + _0x57af84);
          return;
        }
        _0x4d6880.playlist.generate(_0x5909f4, _0x558e97);
      });
    },
    'cached_playlists': {},
    'playlist': {
      'generate': function (_0x30e120, _0x56b3f7) {
        var _0x5f3efa = this;
        if (rtv.player.cached_playlists[_0x30e120] && _0x56b3f7) {
          _0x56b3f7();
        }
        if (typeof _0x30e120 == 'object') {
          rtv.player.cached_playlists[_0x30e120.name] = _0x5f3efa.generateStore(_0x30e120.name, _0x30e120.list);
          if (_0x56b3f7) {
            _0x56b3f7();
          }
        } else {
          $.ajax({
            'dataType': 'json',
            'url': _0x30e120,
            'beforeSend': function (_0x13b5e4) {
              _0x13b5e4.overrideMimeType('text/html;charset=iso-8859-1');
            },
            'success': function (_0xd925db) {
              var _0xc666bf = _0xd925db.playlist ? _0xd925db : JSON.parse(_0xd925db.responseText);
              rtv.player.cached_playlists[_0x30e120] = _0x5f3efa.generateStore(_0x30e120, _0xc666bf);
              if (_0x56b3f7) {
                _0x56b3f7();
              }
            }
          });
        }
      },
      'generateStore': function (_0xa0ad2d, _0x2ceae0) {
        _0x2ceae0.info.url = _0xa0ad2d;
        _0x2ceae0.info.total_duration = 0x0;
        $.each(_0x2ceae0.playlist, function (_0x1dd543, _0x54dc43) {
          _0x2ceae0.info.total_duration += _0x54dc43.duration;
        });
        var _0x12512b = new Date((_0x2ceae0.info.start_epoch_gtm || 0x0) * 0x3e8);
        var _0x5b23cb = Math.floor(new Date() / 0x3e8) - Math.floor(_0x12512b / 0x3e8);
        var _0x304dbf = _0x2ceae0.info.total_duration;
        var _0x406176 = Math.ceil(_0x5b23cb / _0x304dbf);
        if (_0x2ceae0.info.shuffle == true) {
          if (typeof Math.seedrandom == "function") {
            var _0x147b6e = _0x2ceae0.playlist.length;
            var _0x5b02f0;
            var _0x15b4f4;
            Math.seedrandom(_0x406176);
            while (_0x147b6e) {
              var _0x357cf5 = Math.random();
              _0x15b4f4 = Math.floor(_0x357cf5 * _0x147b6e--);
              _0x5b02f0 = _0x2ceae0.playlist[_0x147b6e];
              _0x2ceae0.playlist[_0x147b6e] = _0x2ceae0.playlist[_0x15b4f4];
              _0x2ceae0.playlist[_0x15b4f4] = _0x5b02f0;
            }
          } else {
            console.warn(_0xa0ad2d, "seedrandom is not available, cannot shuffle.");
          }
        }
        $.each(_0x2ceae0.playlist, function (_0x215241, _0x4fd69e) {
          _0x2ceae0.playlist[_0x215241].index = _0x215241;
        });
        var _0xfe1bc = 'rtv' + _0x406176 % 0x270f + rtv.player.findNeedle(_0x2ceae0).substring(0x0, 0x32);
        var _0x234fa4 = "&channels=" + _0xfe1bc;
        _0x2ceae0.info.chat = "https://qchat.rizon.net/?&nick=Kappa...." + _0x234fa4 + '&prompt=1&uio=MTY9dHJ1ZSYzPWZhbHNlJjk9dHJ1ZSYxMD10cnVlJjExPTIxNSYxMz1mYWxzZSYxND1mYWxzZQ9e';
        return _0x2ceae0;
      },
      'utilities': {
        'getCurrentTime': function () {
          var _0x3250de = new Date((this.cache.info.start_epoch_gtm || 0x0) * 0x3e8);
          var _0x57e529 = Math.floor(new Date() / 0x3e8) - Math.floor(_0x3250de / 0x3e8);
          var _0x516874 = this.cache.info.total_duration;
          _0x57e529 %= _0x516874;
          return _0x57e529;
        },
        'getCurrentVideo': function () {
          var _0xb78604 = 0x0;
          var _0x2d4071 = this.getCurrentTime();
          var _0x34b654 = {};
          $.each(this.cache.playlist, function (_0x26747a, _0x5ccb08) {
            if (_0x2d4071 < _0xb78604 + _0x5ccb08.duration) {
              _0x34b654 = _0x5ccb08;
              if (!_0x34b654.src) {
                _0x34b654.src = _0x5ccb08.qualities.pop().src;
              }
              _0x34b654.seek_to = _0x2d4071 - _0xb78604;
              return false;
            } else {
              _0xb78604 += _0x5ccb08.duration;
            }
          });
          return _0x34b654;
        },
        'getCurrentPlayer': function () {
          return this.getCurrentVideo().player || this.cache.info.player || 'html5';
        },
        'getNextVideo': function () {
          var _0x6558a1 = this.getCurrentVideo().index + 0x1;
          return this.cache.playlist[_0x6558a1 == this.cache.playlist.length ? 0x0 : _0x6558a1];
        },
        'getNextPlayer': function () {
          console.log("NV:", this.getNextVideo());
          return this.getNextVideo().player || this.cache.info.player || "html5";
        },
        'generatePlaylistFromIndex': function (_0x1c383a) {
          var _0x39c028 = this.cache.playlist;
          var _0x8ec537 = $("<select />", {
            'class': "guide"
          });
          var _0x32d8aa = moment().subtract(this.getCurrentVideo().seek_to, "seconds");
          $.each(_0x39c028, function (_0x473475, _0x48f96b) {
            if (_0x473475 >= _0x1c383a) {
              $("<option />", {
                'text': _0x32d8aa.format("MM/DD hh:mmA") + "\t" + _0x48f96b.name
              }).appendTo(_0x8ec537);
              _0x32d8aa.add(_0x48f96b.duration, "seconds");
            }
          });
          $("<option />", {
            'text': _0x32d8aa.format("MM/DD hh:mmA") + "\t" + "End of playlist."
          }).appendTo(_0x8ec537);
          return _0x8ec537;
        },
        'swapInstance': function (_0x197fe7) {
          console.log("need to switch from", this.type, 'to', this.getCurrentPlayer());
          this.destroy(true);
          $.extend(this, rtv.player.instance[this.getCurrentPlayer()]);
          this.done = false;
          this.init(this.name);
        }
      }
    },
    'spawn': function (_0x35f678) {
      if (!_0x35f678 && !this.cached_playlists[_0x35f678]) {
        return false;
      }
      localStorage.rtvLastPlaylist = _0x35f678;
      var _0x1ed26e = this.cached_playlists[_0x35f678];
      location.hash = this.findNeedle(_0x1ed26e);
      var _0x5de043 = rtv.player;
      var _0x4cfafd = _0x5de043.players.length;
      var _0x22a1a1 = "player-" + _0x4cfafd;
      $("<i />", {
        'class': "fa fa-repeat",
        'title': _0x1ed26e.info.name
      }).data({
        'url': _0x1ed26e.info.url
      }).click(function () {
        rtv.player.destroy.player($("#container > [id^=window-player-]").data("player-index"));
        rtv.player.spawn(_0x1ed26e.info.url);
      });
      var _0x2a00f6 = {
        'index': _0x4cfafd,
        'name': _0x22a1a1,
        'cache': _0x1ed26e,
        'instance': {}
      };
      _0x2a00f6.test = function () {
        console.log("it's a mystery");
      };
      $("<div />", {
        'id': 'window-' + _0x22a1a1
      }).data({
        'player-index': _0x4cfafd
      }).append($("<div />", {
        'id': _0x22a1a1
      })).appendTo("#container");
      $.extend(_0x2a00f6, _0x5de043.playlist.utilities);
      switch (_0x2a00f6.getCurrentVideo().player || _0x2a00f6.cache.info.player || 'html5') {
        case "youtube":
          $.extend(_0x2a00f6, _0x5de043.instance.youtube);
          break;
        case "dailymotion":
          $.extend(_0x2a00f6, _0x5de043.instance.dailymotion);
          break;
        case "html5":
        case 'h5':
        case '':
        default:
          $.extend(_0x2a00f6, _0x5de043.instance.html5);
      }
      _0x2a00f6.init(_0x22a1a1);
      rtv.player.players.push(_0x2a00f6);
      if (_0x1ed26e.info.hasOwnProperty("name")) {
        document.title = "MY TV | " + _0x1ed26e.info.name;
      }
      return _0x4cfafd;
    },
    'destroy': {
      'all': function () {
        var _0x49cbfa = this;
        $.each(rtv.player.players, function (_0x318f5a, _0x4e2344) {
          _0x49cbfa.player(_0x318f5a);
        });
      },
      'player': function (_0x326c0f) {
        if (typeof _0x326c0f == 'number') {
          if (!rtv.player.players[_0x326c0f]) {
            return -0x1;
          }
          _0x326c0f = rtv.player.players[_0x326c0f];
        }
        if (_0x326c0f == null) {
          return -0x1;
        }
        switch (_0x326c0f.type) {
          case 'youtube':
            this.youtube(_0x326c0f);
            break;
          case "dailymotion":
            this.dailymotion(_0x326c0f);
            break;
          case 'html5':
          default:
            this.html5();
        }
        $('#' + _0x326c0f.name).parent().remove();
        rtv.player.players[_0x326c0f.index] = null;
        $("#container > #chat").remove();
      },
      'youtube': function (_0x2b7194) {
        _0x2b7194.instance.destroy();
      },
      'dailymotion': function (_0x519c5b) {
        _0x519c5b.instance.destroy(_0x519c5b.name);
      },
      'html5': function () {}
    },
    'instance': {
      'youtube': {
        'done': false,
        'destroy': function (_0x2c15cb) {
          this.instance.destroy();
          if (!_0x2c15cb) {
            $('#window-' + this.name).remove();
          }
        },
        'spawnQueue': [],
        'init': function (_0x3cdab1) {
          if (this.done == true) {
            return;
          }
          var _0x3dc45e = this;
          if (typeof YT == "undefined") {
            this.loadAPI();
            this.spawnQueue.push(function () {
              _0x3dc45e.spawn(_0x3cdab1);
            });
          } else {
            this.spawn(_0x3cdab1);
          }
        },
        'processQueue': function () {
          while (this.spawnQueue.length > 0x0) {
            var _0x1eefe8 = this.spawnQueue.splice(0x0, 0x1)[0x0]();
          }
        },
        'loadAPI': function () {
          var _0x5813f6 = document.createElement("script");
          _0x5813f6.src = 'https://www.youtube.com/player_api';
          var _0x22b9e5 = document.getElementsByTagName("script")[0x0];
          _0x22b9e5.parentNode.insertBefore(_0x5813f6, _0x22b9e5);
        },
        'spawn': function (_0x54ceb9) {
          var _0x13c866 = this.getCurrentVideo();
          var _0x350b23 = this;
          var _0x412c96 = new YT.Player(_0x54ceb9, {
            'height': "100%",
            'width': "100%",
            'playerVars': {
              'autoplay': 0x1,
              'controls': 0x0,
              'rel': 0x0,
              'fs': 0x0,
              'mute': 0x0,
              'autohide': 0x1,
              'start': _0x13c866.seek_to,
              'modestbranding': 0x1,
              'showinfo': 0x0
            },
            'videoId': _0x13c866.src,
            'events': {
              'onReady': _0x350b23.playerOnReady,
              'onStateChange': _0x18d74a => _0x350b23.playerOnStateChange(_0x54ceb9, _0x18d74a)
            }
          });
          this.instance = _0x412c96;
          this.type = "youtube";
          return _0x412c96;
        },
        'playerOnReady': function (_0x3dc9f4) {},
        'playerOnStateChange': function (_0x129afe, _0x2f87eb) {
          var _0x50f6cb = $('#' + _0x129afe).parent().data("player-index");
          if (typeof rtv.player.players[_0x50f6cb].resynced === "undefined" && _0x2f87eb.data == YT.PlayerState.PLAYING) {
            rtv.player.players[_0x50f6cb].resynced = true;
            rtv.player.players[_0x50f6cb].resync();
          }
          if (_0x2f87eb.data == YT.PlayerState.ENDED) {
            rtv.player.players[_0x50f6cb].resync(YT.PlayerState.ENDED);
          }
        },
        'resync': function (_0x22a485) {
          var _0x2604de = this;
          var _0x39cfb4 = _0x2604de.getCurrentVideo();
          if (_0x22a485 == YT.PlayerState.ENDED && this.getCurrentPlayer() !== this.type) {
            this.resynced = false;
            this.swapInstance();
            return 0x0;
          }
          if (_0x2604de.instance.getVideoData().video_id == _0x39cfb4.src) {
            _0x2604de.instance.seekTo(_0x39cfb4.seek_to, true);
            _0x2604de.instance.playVideo();
          } else {
            _0x2604de.instance.loadVideoById({
              'videoId': _0x39cfb4.src,
              'startSeconds': _0x39cfb4.seek_to
            });
          }
        },
        'pause': function () {
          this.instance.pauseVideo();
        }
      },
      'dailymotion': {
        'spawnQueue': [],
        'init': function (_0x5b3c7c) {
          if (this.done == true) {
            return;
          }
          var _0x5b1cc1 = this;
          if (typeof DM == 'undefined') {
            this.loadAPI().then(() => {
              _0x5b1cc1.spawn(_0x5b3c7c);
            });
          } else {
            this.spawn(_0x5b3c7c);
          }
        },
        'loadAPI': function (_0x5c8dbd) {
          var _0x40c9a0 = document.createElement('script');
          _0x40c9a0.src = 'https://api.dmcdn.net/all.js';
          var _0x5d1913 = document.getElementsByTagName("script")[0x0];
          _0x5d1913.parentNode.insertBefore(_0x40c9a0, _0x5d1913);
          return new Promise(_0x18248a => _0x40c9a0.onload = _0x18248a);
        },
        'destroy': function (_0x1cf819) {},
        'spawn': function (_0x5384ec) {
          var _0xf460b6 = this.getCurrentVideo();
          var _0xb3862b = new DM.player(_0x5384ec, {
            'height': "100%",
            'width': "100%",
            'video': _0xf460b6.src,
            'params': {
              'autoplay': true,
              'start': _0xf460b6.seek_to
            }
          });
          _0xb3862b.addEventListener('video_end', () => this.resync("ended"));
          this.instance = _0xb3862b;
          this.type = "dailymotion";
          return _0xb3862b;
        },
        'resync': function (_0x39c262) {
          var _0x2b1a62 = this;
          var _0x522e77 = _0x2b1a62.getCurrentVideo();
          if (_0x39c262 == "ended" && this.getCurrentPlayer() !== this.type) {
            this.resynced = false;
            this.swapInstance();
            return 0x0;
          }
          if (_0x2b1a62.instance.video.videoId == _0x522e77.src) {
            _0x2b1a62.instance.seek(_0x522e77.seek_to, true);
            _0x2b1a62.instance.play();
          } else {
            _0x2b1a62.instance.load(_0x522e77.src);
          }
        },
        'pause': function () {
          this.instance.pause();
        }
      },
      'html5': {
        'init': function (_0x4818c6) {
          this.spawn(_0x4818c6);
        },
        'destroy': function (_0x25fd92) {
          $(this.instance).remove();
          delete this.instance;
          if (!_0x25fd92) {
            $('#window-' + this.name).remove();
          }
        },
        'spawn': function (_0x4adda2) {
          var _0x58426a = this.getCurrentVideo();
          var _0x450858 = this;
          var _0x425c97 = $("<video />", {
            'preload': "none",
            'controls': '',
            'autoplay': ''
          });
          _0x425c97.append($("<source />"), {
            'src': (this.cache.info.url_prefix || '') + _0x58426a.src,
            'type': "video/mp4"
          });
          _0x425c97[0x0].addEventListener("ended", function () {
            _0x450858.resync('ended');
          }, false);
          _0x425c97[0x0].addEventListener("wheel", _0x39697b => _0x39697b.target.volume = _0x39697b.deltaY < 0x0 ? Math.min(0x1, _0x39697b.target.volume + 0.1) : Math.max(0x0, _0x39697b.target.volume - 0.1));
          _0x425c97[0x0].addEventListener("auxclick", _0x338e68 => _0x338e68.target.muted ^= _0x338e68.which == 0x2);
          $('#' + _0x4adda2).html(_0x425c97);
          this.instance = _0x425c97[0x0];
          this.type = "html5";
          this.resync();
        },
        'resync': function (_0x5cb830) {
          var _0x43453f = this.getCurrentVideo();
          var _0x2fbf73 = this;
          if (_0x5cb830 == "ended" && this.getCurrentPlayer() !== this.type) {
            this.swapInstance();
            return 0x0;
          }
          var _0x2a1768 = (_0x2fbf73.cache.info.url_prefix || '') + _0x43453f.src;
          if (decodeURI(_0x2a1768) !== decodeURI(_0x2fbf73.instance.src)) {
            _0x2fbf73.instance.src = _0x2a1768;
          }
          _0x2fbf73.instance.currentTime = _0x43453f.seek_to;
          _0x2fbf73.instance.play();
        },
        'pause': function () {
          this.instance.pause();
        }
      }
    }
  },
  'menu': {
    'spawn': function () {
      var _0x33f8fe = $("<div id='menu'/>");
      $("<i />", {
        'class': "fa fa-expand",
        'title': "Toggle Fullscreen"
      }).click(function () {
        if (document.fullscreenElement == null) {
          $('body')[0x0].requestFullscreen();
          {
            $('#menu').toggleClass("autohide");
          }
        } else {
          document.exitFullscreen();
        }
        $(this).toggleClass("fa-expand fa-compress");
      }).appendTo(_0x33f8fe);
      _0x33f8fe.tooltip({
        'position': {
          'my': "left center",
          'at': "right+10% center",
          'collision': 'fit'
        }
      });
      return _0x33f8fe;
    },
    'sleep': {
      'timer': 0x0,
      'end': '',
      'last': 0x1,
      'dialog': function () {
        var _0x180af7 = this;
        $(this.contents()).dialog({
          'id': 'sleepDialog',
          'autoOpen': true,
          'height': "auto",
          'width': "auto",
          'modal': true,
          'buttons': {
            'Apply': function () {
              _0x180af7.last = parseFloat($("input.sleep")[0x0].value) || 0x0;
              var _0x273722 = _0x180af7.last * 0x36ee80;
              _0x180af7.end = moment().add(_0x273722).format("hh:mmA");
              clearTimeout(_0x180af7.timer);
              _0x180af7.timer = 0x0;
              if (_0x273722 > 0x0) {
                _0x180af7.timer = setTimeout(() => {
                  document.exitFullscreen();
                  rtv.player.players.filter(_0x4711bc => _0x4711bc !== null).forEach(_0x57b714 => {
                    _0x57b714.pause();
                    _0x180af7.timer = 0x0;
                  });
                }, _0x273722);
              }
              $(this).html(_0x180af7.contents());
            }
          },
          'close': function (_0x1fe0e7, _0x5d7874) {
            $(this).dialog("destroy");
          }
        });
        $("<div title=\"Sleep Timer\" style=\"text-align:center\"></div>").find('button').button();
      },
      'contents': function () {
        var _0xb37c2a = this.timer == 0x0 ? "Sleep timer disabled." : "Sleep timer set for " + this.end;
        var _0x460325 = "<div title=\"Sleep Timer\" style=\"text-align:center\">\n                        Enter a duration in hours to automatically stop playback.<br>Set to 0 to disable.<br><br>\n                        <input type=\"number\" class=\"sleep\" name=\"\" min=\"0\" step=\"0.5\" value=\"" + this.last + "\" style=\"text-align:center\"><br>\n                        <br>\n                        " + _0xb37c2a + "\n                        </div>";
        return _0x460325;
      }
    },
    'share': function () {
      return $("<i />", {
        'class': "fa fa-paper-plane",
        'title': "Share this channel"
      }).click(function () {
        var _0x2aa418 = rtv.player.players[$("[id^=window-player]").eq(0x0).data()["player-index"]].cache;
        if (/^custom\d+$/.test(_0x2aa418.info.url)) {
          var _0x2c90e4 = JSON.parse(JSON.stringify(_0x2aa418));
          delete _0x2c90e4.info.chat;
          delete _0x2c90e4.info.url;
          delete _0x2c90e4.info.total_duration;
          for (i in _0x2c90e4.playlist) {
            delete _0x2c90e4.playlist[i].index;
          }
          var _0x3466f8 = location.href.split('#')[0x0] + "#?custom";
          var _0x35dcc0 = $("<a>", {
            'target': "_blank",
            'href': _0x3466f8,
            'text': _0x3466f8 || "Share this URL"
          });
          var _0x5534b7 = $("<div title='Share " + _0x2aa418.info.name + "' />").append("<p style='text-align:left'>This custom channel is not hosted on this site and must be manually shared.<br><br><strong>Step 1:</strong> Share " + _0x35dcc0[0x0].outerHTML + " <br><strong>Step 2:</strong> Share the custom channel contents, below:</p>").append($("<textarea>", {
            'id': 'shareCustom',
            'text': JSON.stringify(_0x2c90e4),
            'readonly': "readonly"
          }).focus(function () {
            $(this).select();
          }));
          $(_0x5534b7).dialog({
            'autoOpen': true,
            'height': "auto",
            'width': "auto",
            'modal': true,
            'dialogClass': "dialog-shareChannel",
            'close': function () {
              $(this).dialog("destroy");
            },
            'buttons': {}
          });
        } else {
          var _0x3466f8 = location.href;
          var _0x588065 = $("<input readonly value='" + _0x3466f8 + "' />").focus(function () {
            $(this).select();
          });
          var _0x5534b7 = $("<div title='Share " + _0x2aa418.info.name + "' />").append(_0x588065);
          var _0x3a39ec = escape("Let's watch " + _0x2aa418.info.name + " together! " + _0x3466f8);
          $(_0x5534b7).append("<a target='_blank' href='http://twitter.com/home?status=" + _0x3a39ec + "'><i class='fa fa-twitter'></i> Tweet</a>");
          $(_0x5534b7).dialog({
            'autoOpen': true,
            'height': "auto",
            'width': "auto",
            'modal': true,
            'dialogClass': "dialog-shareChannel",
            'close': function () {
              $(this).dialog("destroy");
            }
          });
        }
      });
    }
  },
  'guide': {
    'config': {
      'markerWidth': 0x78,
      'readLimit': 0x0
    },
    'channels': {
      'open': function () {
        var _0x288a79 = this;
        var _0x5947cf = "<div id='customizeChannels' title='Select MY TV Channels'><form>" + this.generateTable()[0x0].outerHTML + "</form></div>";
        var _0x8d6c3d = $(_0x5947cf).dialog({
          'autoOpen': true,
          'height': 'auto',
          'width': "auto",
          'modal': true,
          'dialogClass': "dialog-customizePlaylists",
          'buttons': {
            'test': {
              'text': "Custom Channels",
              'class': "customPlaylists",
              'click': function () {
                _0x288a79.custom.open();
              }
            },
            'custrepo': {
              'text': "Channel Repositories",
              'class': "customPlaylists",
              'click': function () {
                var _0x1d86de = prompt("Comma-separated list of repo URLs:", rtv.config.cache.repos);
                rtv.config.cache.repos = _0x1d86de.split(',');
                rtv.config.save();
                location.reload();
              }
            },
            'Save': _0x249416,
            'Cancel': function () {
              _0x8d6c3d.dialog('close');
            }
          },
          'close': function () {}
        });
        function _0x249416() {
          var _0x522adf = [];
          $("select#chanYours option").each(function () {
            if ($.inArray($(this).val(), _0x522adf) == -0x1) {
              _0x522adf.push($(this).val());
            }
          });
          if (_0x522adf.length > 0x0) {
            rtv.config.cache.playlists = _0x522adf;
            rtv.config.save();
            var _0x33e5b1 = '';
            if ($.inArray(localStorage.rtvLastPlaylist, _0x522adf) == -0x1) {
              localStorage.removeItem("rtvLastPlaylist");
              _0x33e5b1 = "<hr><p><strong>Note:</strong> Your last viewed channel is not in <strong>Your Channels</strong> and has been reset.<br>Upon reload, a random channel will be selected.</p>";
            }
            var _0x185761 = "<div title='Select MY TV Channels - Saved'><p><strong>Your Channels</strong> has been saved, please reload MY TV to reflect any changes.</p>" + _0x33e5b1 + '</div>';
            var _0x23e97b = $(_0x185761).dialog({
              'modal': true,
              'width': "auto",
              'buttons': {
                "Reload now": function () {
                  location.reload();
                },
                'Cancel': function () {
                  _0x23e97b.dialog("close");
                }
              }
            });
          } else {
            $("<div title='Select MY TV Channels - Error'><p><strong>Your Channels</strong> must have at least one channel.</p></div>").dialog({
              'modal': true,
              'width': "auto"
            });
          }
        }
        _0x8d6c3d.find("button").button().click(function (_0x41a6d7) {
          _0x41a6d7.preventDefault();
          switch ($(this).attr('id')) {
            case "availMoveAll":
              $("select#chanAvail option").each(function (_0x5ebfb8, _0x4180dd) {
                $("select#chanYours").append($(this).clone());
                $(this).remove();
              });
              break;
            case "availMoveSel":
              $("select#chanAvail option:selected").each(function (_0x5973d9, _0x32b9f0) {
                $("select#chanYours").append($(this).clone());
                $(this).remove();
              });
              break;
            case "yoursMoveAll":
              $("select#chanYours option").each(function (_0x14d3f5, _0x33b42d) {
                $("select#chanAvail").append($(this).clone());
                $(this).remove();
              });
              break;
            case "yoursMoveSel":
              $("select#chanYours option:selected").each(function (_0x1e748d, _0x9ca1f0) {
                $('select#chanAvail').append($(this).clone());
                $(this).remove();
              });
              break;
          }
          $("#customizeChannels select option:selected").removeAttr("selected");
        });
      },
      'cleanupRegex': /(^playlists\/|(\.())+$)/ig,
      'generateTable': function () {
        var _0x226540 = $("<div />").append("<p>Channels under <strong>Your Channels</strong> will be displayed in the guide.<br><strong>Custom Channels</strong> are modified by clicking the button below.</p>");
        var _0x209990 = $("<table />", {
          'id': 'customizeChannels',
          'class': "customizeChannels",
          'style': "background-color:white"
        });
        _0x209990.append("<tr class='header'><td>Available Channels</td><td>Your Channels</td></tr>");
        var _0x1d5cba = $("<select />", {
          'id': "chanYours",
          'multiple': true,
          'size': 0x6
        });
        for (i = 0x0; i < rtv.config.cache.playlists.length; i++) {
          var _0x23a65d = rtv.config.cache.playlists[i];
          $("<option />", {
            'value': _0x23a65d,
            'text': _0x23a65d.replace(this.cleanupRegex, '')
          }).appendTo(_0x1d5cba);
        }
        var _0xbe4bb9 = this.availChannels();
        _0x209990.append("<tr><td>" + _0xbe4bb9[0x0].outerHTML + '</td><td>' + _0x1d5cba[0x0].outerHTML + '</td></tr>');
        _0x209990.append("<tr><td style='text-align:right'><button id='availMoveAll'>All &gt;</button><button id='availMoveSel'>Selected &gt;</button></td><td style='text-align:left'><button id='yoursMoveSel'>&lt; Selected</button><button id='yoursMoveAll'>&lt; All</button></td></tr>");
        _0x209990.append('</table>');
        _0x226540.append(_0x209990);
        return _0x226540;
      },
      'availChannels': function (_0x2842e9) {
        var _0x140bb0 = $("<select />", {
          'id': "chanAvail",
          'multiple': true,
          'size': 0x6
        });
        for (i = 0x0; i < rtv.config.defaultPlaylists.length; i++) {
          var _0x4459d0 = rtv.config.defaultPlaylists[i];
          if ($.inArray(_0x4459d0, rtv.config.cache.playlists) == -0x1) {
            $("<option />", {
              'value': _0x4459d0,
              'text': _0x4459d0.replace(this.cleanupRegex, '')
            }).appendTo(_0x140bb0);
          }
        }
        return _0x140bb0;
      },
      'custom': {
        'open': function (_0x196112) {
          var _0x132312 = this;
          var _0xca2877 = !_0x196112 ? "Enter each custom channel in its own text box." : "Did someone share a custom channel with you?<br>Please paste it below and click \"Save\" to use it.";
          var _0x17c11a = "<div title='Custom Channels'><p>" + _0xca2877 + '</p>' + this.load() + "</div>";
          var _0x2ccfaa = $(_0x17c11a).dialog({
            'autoOpen': true,
            'height': 'auto',
            'width': "auto",
            'modal': true,
            'buttons': {
              'Help': function () {
                window.open('', "_blank");
              },
              'upload': {
                'text': "Open",
                'click': function () {
                  _0x132312.upload();
                }
              },
              'Save': function () {
                _0x132312.save(_0x196112);
              },
              'Cancel': function () {
                _0x2ccfaa.dialog("close");
              }
            }
          }).attr('id', "customPlaylistsManager");
        },
        'save': function (_0x975b9) {
          console.log(_0x975b9);
          var _0x4b524f = [];
          var _0x471c3c = this;
          $("#customPlaylistsManager input").each(function (_0x3bc549, _0x592277) {
            if (_0x592277.value !== '' && _0x471c3c.test(_0x592277.value)) {
              _0x4b524f.push(JSON.parse(_0x592277.value));
            }
          });
          localStorage.rtvCustomPlaylists = JSON.stringify(_0x4b524f);
          if (_0x4b524f.length > 0x0) {
            rtv.config.customs();
            if (_0x4b524f.length == 0x1) {
              rtv.player.destroy.player($("#container > [id^=window-player-]").data("player-index"));
              rtv.player.spawn("custom0");
            }
            if (!_0x975b9) {
              rtv.guide.open();
            } else {
              $("#customPlaylistsManager").dialog("close");
            }
          } else {
            var _0x1105e4 = $("<div title='Custom Channels - Saved'><p><strong>Custom Channels</strong> has been saved, please reload MY TV to reflect any changes.</p></div>").dialog({
              'modal': true,
              'width': 'auto',
              'buttons': {
                "Reload now": function () {
                  location.reload();
                },
                'Cancel': function () {
                  _0x1105e4.dialog("close");
                }
              }
            });
          }
        },
        'test': function (_0x1535d9) {
          try {
            var _0x43e941 = JSON.parse(_0x1535d9);
            return _0x43e941.info && _0x43e941.info.name && _0x43e941.playlist.length > 0x0 ? true : (rtv.guide.channels.custom.edialog(i, "No info.name or empty playlist.", "Ensure it was entered correctly."), false);
          } catch (_0x29c66a) {
            rtv.guide.channels.custom.edialog(i, _0x29c66a, "Ensure it was entered correctly.");
            return false;
          }
        },
        'edialog': function (_0x2cdcbd, _0x46e1b1, _0x570b18) {
          $("<div title=\"Issue parsing input #" + (_0x2cdcbd + 0x1) + "\"><p class=\"depress\">" + _0x46e1b1 + "</p>" + _0x570b18 + "</div>").dialog({
            'width': "auto",
            'modal': 0x1
          });
        },
        'genInput': function (_0x3a5394) {
          return $("<input />", {
            'placeholder': "Paste playlist here...",
            'style': 'width:100%',
            'value': _0x3a5394
          })[0x0].outerHTML;
        },
        'load': function () {
          var _0x1eac6d = this;
          var _0x179195 = _0x1eac6d.genInput('');
          if (localStorage.rtvCustomPlaylists) {
            $.each(JSON.parse(localStorage.rtvCustomPlaylists), function (_0x52dfbe, _0x26420d) {
              _0x179195 = _0x1eac6d.genInput(JSON.stringify(_0x26420d)) + _0x179195;
            });
          }
          return _0x179195;
        },
        'upload': function () {
          var _0xeebec1 = this;
          var _0x1dcda5 = $("<input>", {
            'type': "file",
            'accept': ".txt,.json"
          }).change(function (_0x4f764c) {
            var _0x4aedc2 = new FileReader();
            _0x4aedc2.onload = function () {
              $("#customPlaylistsManager").append(_0xeebec1.genInput(_0x4aedc2.result));
            };
            _0x4aedc2.readAsText(_0x4f764c.currentTarget.files[0x0]);
          }).click();
          return _0x1dcda5;
        }
      }
    },
    'open': function () {
      this.close();
      $('body').append(rtv.guide.generate());
    },
    'close': function () {
      $("#rtvGuide").remove();
    },
    'generate': function () {
      var _0x3c6098 = this;
      var _0x256a61 = $("<div />", {
        'id': "rtvGuide"
      });
      var _0x19d807 = $("<div />", {
        'id': "rtvGuideSub"
      });
      var _0x414b21 = $("<div />", {
        'id': 'rtvChannels'
      });
      var _0x5427bb = $("<div />", {
        'id': 'rtvShows'
      });
      _0x256a61.append(this.generateHead());
      var _0x3e6876 = 0x0;
      var _0x4983f6 = moment();
      $.each(Object.keys(rtv.player.cached_playlists).sort(), function (_0x5b4edb, _0x3f078a) {
        var _0x52846e = $.extend({}, {
          'cache': rtv.player.cached_playlists[_0x3f078a]
        }, rtv.player.playlist.utilities);
        var _0x1b49b6 = rtv.player.players.length > 0x0 && rtv.player.players.slice(-0x1)[0x0].cache.info.url == _0x52846e.cache.info.url;
        var _0x345618 = _0x3c6098.generateChannel(_0x52846e);
        var _0x4ff3c3 = _0x3c6098.generateRow(_0x52846e);
        if (_0x1b49b6) {
          _0x414b21.prepend(_0x345618);
          _0x5427bb.prepend(_0x4ff3c3.row);
        } else {
          _0x414b21.append(_0x345618);
          _0x5427bb.append(_0x4ff3c3.row);
        }
        if (_0x4ff3c3.width > _0x3e6876) {
          _0x3e6876 = _0x4ff3c3.width;
        }
        _0x4983f6 = _0x4ff3c3.halfhour;
      });
      _0x414b21.prepend($("<div />", {
        'class': "channel marker"
      }));
      _0x5427bb.append(this.generateLiner(_0x4983f6));
      _0x5427bb.prepend(this.generateMarkers(_0x3e6876, _0x4983f6));
      _0x19d807.append(_0x414b21);
      _0x19d807.append(_0x5427bb);
      _0x256a61.append(_0x19d807);
      $(_0x256a61).on("click", ".show", function () {
        $("<div />", {
          'html': this.title.replace(/\n/g, "<br>")
        }).dialog({
          'autoOpen': true,
          'height': "auto",
          'width': 'auto',
          'modal': true,
          'close': function () {}
        });
      });
      return _0x256a61;
    },
    'generateHead': function () {
      var _0x2319dc = $("<div />", {
        'class': "guideHead"
      });
      $.each([["Close MY TV Guide", function () {
        rtv.guide.close();
      }], ["Resync Player", function () {
        $("[id^=window-player]").each(function () {
          rtv.player.players[$(this).data()["player-index"]].resync();
        });
      }], ["Select Channels", function () {
        rtv.guide.channels.open();
      }], ["About MY TV", function () {
        rtv.about();
      }]], function (_0x27f1c3, _0x409d3e) {
        $("<span />", {
          'class': "pointer",
          'text': _0x409d3e[0x0]
        }).on("click", _0x409d3e[0x1]).appendTo(_0x2319dc);
      });
      if (0x0 && Notification.permission !== "granted") {
        $("<span />", {
          'id': "enableSubs",
          'class': "pointer",
          'text': "(Enable Subscriptions)"
        }).one("click", function () {
          $("#enableSubs").remove();
        }).appendTo(_0x2319dc);
      }
      return _0x2319dc;
    },
    'generateChannel': function (_0x1996d4) {
      var _0x2004d5 = rtv.player.players.length > 0x0 && rtv.player.players.slice(-0x1)[0x0].cache.info.url == _0x1996d4.cache.info.url ? " currentStream" : '';
      var _0x277fec = $("<div />", {
        'class': "channel pointer" + _0x2004d5,
        'text': _0x1996d4.cache.info.name,
        'title': _0x1996d4.cache.info.note
      });
      _0x277fec.click(function (_0x29444) {
        rtv.player.destroy.player($("#container > [id^=window-player-]").data("player-index"));
        rtv.player.spawn(_0x1996d4.cache.info.url);
        rtv.guide.close();
      });
      return _0x277fec;
    },
    'generateMarkers': function (_0x2e783c, _0x26c78d) {
      var _0x142322 = $("<div />", {
        'class': "row marker"
      });
      for (limit = 0x0; limit < Math.ceil(_0x2e783c / this.config.markerWidth) + 0x1; limit++) {
        $("<div />", {
          'class': "show",
          'text': _0x26c78d.format('LT') + (_0x26c78d.hour() == 0x0 && _0x26c78d.minute() < 0x1e ? " (" + _0x26c78d.format('l') + ')' : '')
        }).css({
          'width': this.config.markerWidth,
          'maxWidth': this.config.markerWidth
        }).appendTo(_0x142322);
        _0x26c78d.add(0x1e, "minutes");
      }
      return _0x142322;
    },
    'generateLiner': function (_0x51f53b) {
      var _0x5badce = this.itemWidth(Math.floor(new Date() - _0x51f53b.toDate()) / 0x3e8);
      return $("<div />", {
        'class': "sparksLinerHigh"
      }).css({
        'left': _0x5badce + 'px'
      });
    },
    'generateRow': function (_0x3b8756) {
      var _0x506ca9 = this;
      var _0x2a7adf = $("<div />", {
        'class': "row"
      });
      var _0x581257 = _0x3b8756.getCurrentVideo();
      var _0x1b720d = moment().add(_0x581257.duration - _0x581257.seek_to, "seconds");
      var _0x2e944c = moment().seconds(0x0);
      _0x2e944c.minutes(_0x2e944c.minutes() >= 0x1e ? 0x1e : 0x0);
      var _0x19c6e6 = moment().subtract(_0x581257.seek_to, "seconds");
      var _0x29a11b = _0x19c6e6.toDate() < _0x2e944c.toDate() ? 0x0 : Math.round((_0x19c6e6.toDate() - _0x2e944c.toDate()) / 0x3e8);
      var _0x56ba05 = Math.round((_0x1b720d.toDate() - _0x2e944c.toDate()) / 0x3e8);
      var _0x1c0123 = _0x19c6e6.toDate() < _0x2e944c.toDate() ? _0x56ba05 : _0x581257.duration;
      var _0x2dacdc = 0x0;
      $("<div />", {
        'class': "show gap"
      }).width(this.itemWidth(_0x29a11b)).appendTo(_0x2a7adf);
      var _0x24c18b = this.config.readLimit ? _0x581257.index + 0x1 + this.config.readLimit : _0x3b8756.cache.playlist.length;
      $.each(_0x3b8756.cache.playlist.slice(_0x581257.index, _0x24c18b), function (_0x185fa8, _0x364e0c) {
        var _0x250962 = _0x185fa8 > 0x0 ? _0x364e0c.duration : _0x1c0123;
        var _0xc8df72 = _0x506ca9.itemWidth(_0x250962);
        _0x2dacdc += _0xc8df72;
        var _0x38800c = _0x364e0c.index + 0x1 == _0x3b8756.cache.playlist.length ? " playlistEnd" : '';
        var _0x427f80 = _0x185fa8 == 0x0 && _0x364e0c.duration !== _0x1c0123 ? " abruptStart" : '';
        $("<div />", {
          'class': "show" + _0x38800c + _0x427f80,
          'text': _0x364e0c.name,
          'title': _0x364e0c.name + "\nDuration: " + moment.utc(_0x364e0c.duration * 0x3e8).format("H:mm:ss") + "\n" + (moment().toDate() > _0x19c6e6.toDate() ? "Started " : "Starts ") + moment().to(_0x19c6e6) + "\nStart: " + _0x19c6e6.format("LLLL") + "\nStop: " + _0x19c6e6.add(_0x364e0c.duration, "seconds").format('LLLL')
        }).css({
          'width': _0xc8df72,
          'maxWidth': _0xc8df72
        }).appendTo(_0x2a7adf);
      });
      return {
        'row': _0x2a7adf,
        'width': _0x2dacdc,
        'halfhour': _0x2e944c
      };
    },
    'itemWidth': function (_0x15452c) {
      var _0x18bf75 = this.config.markerWidth;
      var _0x53210e = Math.floor(_0x15452c / 0x708) * _0x18bf75 + Math.round(_0x15452c % 0x708 / 0x708 * _0x18bf75);
      return _0x53210e;
    }
  },
  'notifications': {
    'init': function () {
      if ("Notification" in window) {
        Notification.requestPermission();
      }
      this.subscriptions.load();
    },
    'subscriptions': {
      'cache': [],
      'subNextInLastPlaylist': function () {
        var _0x4ccfb7 = rtv.player.players.slice(-0x1)[0x0];
        var _0x336842 = _0x4ccfb7.getCurrentVideo();
        var _0x24de6d = _0x4ccfb7.cache.playlist[_0x336842.index + 0x1];
        this.add({
          'title': _0x24de6d.name,
          'startTime': moment().subtract(_0x336842.seek_to, "seconds").add(_0x336842.duration, "seconds"),
          'duration': _0x24de6d.duration,
          'channel': _0x4ccfb7.cache.info.name,
          'url': _0x4ccfb7.cache.info.url
        });
      },
      'load': function () {
        if (localStorage.rtvSubCache) {
          this.cache = JSON.parse(localStorage.rtvSubCache);
        }
        rtv.notifications.processSubscriptions();
      },
      'save': function () {
        rtv.notifications.processSubscriptions();
      },
      'add': function (_0x2aa00c) {
        this.cache.push(_0x2aa00c);
        this.save();
      },
      'remove': function (_0x4cc133) {
        this.save();
      }
    },
    'processSubscriptions': function () {
      var _0x5c0b42 = this;
      $.each(this.subscriptions.cache, function (_0xa10746, _0x48d8d2) {
        _0x5c0b42.push({
          'title': _0x48d8d2.channel,
          'body': _0x48d8d2.title + " begins " + _0x48d8d2.startTime.fromNow() + "\nClick here to tune in.",
          'url': _0x48d8d2.url
        });
      });
    },
    'push': function (_0x1b63cc) {
      var _0x373fe9 = _0x1b63cc.title || "Default title";
      var _0x453867 = new Notification(_0x373fe9, {
        'body': _0x1b63cc.body,
        'data': _0x1b63cc.url
      });
      _0x453867.onclick = function (_0x1c7cea) {
        rtv.player.players.slice(-0x1)[0x0].destroy();
        rtv.player.spawn(_0x1c7cea.target.data);
        rtv.guide.close();
      };
    }
  }
};
function onYouTubePlayerAPIReady() {
  rtv.player.instance.youtube.processQueue();
}
$(document).ready(function () {
  rtv.preinit();
});
