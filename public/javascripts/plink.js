CloudFlare.define("prosperlinks", ["prosperlinks/config", "cloudflare/config", "cloudflare/user", "cloudflare/jquery1.7"], function(_config, _cfconfig, _user, jqP)
{
    //set the prosperent options
    var prosperent_pl_uid = 403446;
    var prosperent_pl_sid = _cfconfig.zone;
    var prosperent_pl_hoverBox = ("1" == _config.pl_hoverBox ? true : false);
    var prosperent_pl_underline = _config.pl_underline;
    var prosperent_pl_limit = _config.pl_limit;
    var prosperent_pl_enableLinkAffiliation = ("1" == _config.pl_enableLinkAffiliation ? true : false);

    window.alreadyLinked = [];
    window.sendContent   = {};

    jqP(document).ready(function()
    {
        // if IE, force to use latest version compatibility, prevents browser mode
        // and document mode from being different
        if (jqP.browser.msie)
        {
           jqP('head').append('<meta http-equiv="X-UA-Compatible" content="IE=edge">');
        }

        // create prosperlinks css link element
        var headEl = document.getElementsByTagName('head')[0];
        var link   = document.createElement('link');

        //link.href = 'http://alex.prosperent.net/resources/css/prosperlinks.css';
        link.href = 'http://prosperent.com/resources/css/prosperlinks.css';
        link.type = 'text/css';
        link.rel  = 'stylesheet';
        headEl.appendChild(link);

        // remove google adsense
        var goog = /googleads|googleadservices/i;

        jqP('a').each(function(){
            if (goog.test(jqP(this).attr('href')) == true)
                jqP(this).parent().addClass('prosperent-pl-no-render');
        });

        // rewriting affiliate urls
        var anchors = jqP('body').clone().find('a');

        // remove unwanted elements
        var linkGone = jqP('body').clone().find('script,.prosperent-pl-no-render,.meta,#navbar,#subnavbar,header,footer,#sidebar,#footer,#header,.blog_entry_date,#seo_links,p.header,.vbmenu_popup,.sig,.smallfont,strong,applet,embed,object,link,param,select,option,svg,textarea,head,title,meta,link,noscript,a,.after_content,.posthead,.userinfo,dt,dd,dl,#thread_info,#similar_threads,#options_block_container,.gB,.twitter_box,link,var,style,select,object,img,caption,code,abbr,input,button,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6,cite,label,.postmeta').remove().end();
        var body = linkGone.html();

        if (jqP.browser.msie && jqP.browser.version > 7)
        {
            function bc(a, b)
            {
                return a.parents(b.join(",")).size() ? !1 : !0
            }

            var c = this, t = c.document, v = [], M = "";

            function filterContent()
            {
                a = ["body"], b = [], B = this.location;

                function f(a)
                {
                    var b = a.nodeName === '#text' ? jqP.trim(a.nodeValue) : null;
                    return b ? (v.push(a), m++, 10 > m ? j.push(b) : (m = 0, j.push(b + "\n"), M += j.join(' '), j = []), !0) : !1
                }

                a = a || [];
                b = b || [];
                0 == a.length && (a[0] = "body");
                b.push('.prosperent-pl-no-render','.meta','#navbar','#subnavbar',"#footer",'#header','.blog_entry_date','#seo_links','p.header','.vbmenu_popup','.sig','.smallfont','.after_content','.posthead','.userinfo','#thread_info','#similar_threads','#options_block_container','.gB','.postmeta','.twitter_box,link','.h1','.h2','.h3','.h4','.h5','.h6',"div[class=widget-content]","div[class=googleAdText]","div[id=ad]","div[id=banner]","div[id=advertisement]","div[id=adv_container]","div[class=ad]","div[class=banner]","div[class=advertisement]","div[class=ad_container]","div[id=ads]","div[class*=ArticleAd]","div[id*=googleAdUnitIframe]","div[id*=adBlock]","div[class*=adBlock]","div[id*=siteSub]","div[id=BA]"); - 1 != B.href.indexOf(".google.") ? (b.push("td[class=gac_c]"), b.push("table[id=mbEnd]"), b.push("span[id=taw]"), b.push("td[class=std]"), b.push("table[class=gssb_e]")) : -1 != B.href.indexOf(".yahoo.") ? (b.push("ul[class=spns reducepx-spnslist]"), b.push("ul[class*=reducepx-spnslist]"), b.push("ul[id=east]")) : -1 != B.href.indexOf(".aol.") ? (b.push("div[class=sllLink]"), b.push("div[class=n]")) : -1 != B.href.indexOf(".bing.") && (b.push("div[class=sb_adsW]"), b.push("div[id=sidebar]"));

                excludes = 'script,header,footer,strong,applet,embed,object,link,param,select,option,svg,textarea,head,title,meta,link,noscript,a,dt,dd,dl,link,var,style,select,object,img,caption,code,abbr,input,button,h2,h3,h4,h5,h6,cite,label';
                if (!v.length) for (var c = [], m = 0, j = [], g = 0, k = a.length; g < k; g++) for (var h = jqP(a[g]), l = 0, r = h.length; l < r; l++)
                {
                    c.push(h[l]);
                    for (j = []; 0 < c.length;) if (node = c.shift()) if (node.hasChildNodes())
                    {
                        children_to_callback = [];
                        i = 0;
                        for (k = node.childNodes.length; i < k; i++)
                        {
                            child = node.childNodes[i]
                            if (child.nodeName && !f(child) && (excludes + ',').indexOf(child.nodeName.toLowerCase() + ',') === -1)
                                bc(jqP(child), b) && c.push(child);
                        }
                    }
                    else f(node);
                    M += j.join(' ');
                    j = []
                }

                return M;
            }

            body = filterContent();
        }

        // final cleanup
        body = body.replace(/<!--[\s\S]*?-->|<.*?>|{.*?}/g, '')                             // comment tags, html tags, code within style brackets
                   .replace(/&nbsp;/g, ' ')                                                 // space
                   .replace(/&amp;/g,'&')                                                   // ampersand
                   .replace(/&gt;|&lt;/, '')                                                // greater than or less than chars
                   .replace(/[^a-zA-Z&0-9'\s{1}._"\/-]+/g, ' ')                             // keeps
                   .replace(/\w+\s+\d{1,2},\s+\d{4}|\d{2}\-\d{4}/g, '')                     // date
                   .replace(/(\()?\d{3}(\))?(\s+)?(-\s+)?\d{3}(\s+)?(-)?(\s+)?\d{4}/ig, '') // phone #'s
                   .replace(/\w+(,)?\s+[A-Z]{2}\s+\d{5}((\s+)?(-)?(\s+)?(\d{4}))?/g,  '')   // city, state, zip
                   .replace(/[\d{1,}|\w+[//|\-|\s{1}]{1}]\d{1,}[\/|\-|\s{1}|th]?\d+/g, '')    // dates
                   .replace(/All Rights Reserved|copyright|by:|tags:/ig, '')                // irrelevant words/phrases
                   .replace(/\n+|\r\n|\t+|\v+|\r+/g, ' ')                                   // line breaks
                   .replace(/(,(\s+)?){2,}|(\-(\s+)?){2,}|(\.(\s+)?){2,}/g, '')             // consecutive, mutiple punctuation occurences [,.-]
                   .replace(/^\s+|\s+$/g, '')                                               // trim spaces
                   .replace(/\s{2,}/g, ' ');                                                // final spaces removal

        body = body.substring(0, 7000);

        window.sendContent.body    = body;
        window.sendContent.affUrls = [];


        // rewriting affiliate urls
        var affUrls = {
            _anchors : jqP('body').find('a'),
            _html    : document.body.innerHTML,

            /**
             * find anchor tags with hrefs matching give domains
             *
             * @return void
             */
            match : function()
            {
                rewrites = [];
                if (this._anchors != null && this._anchors != 'undefined' && this._anchors.length > 0)
                {
                    for (var i=0;i<=this._anchors.length-1;++i)
                    {
                        jqP(this._anchors[i]).addClass('prosp-pl-affrep' + i);
                        this.href  = jqP(this._anchors[i]).attr('href');
                        this.text  = jqP(this._anchors[i]).text();
                        if (this.href != null && this.href != 'undefined')
                        {
                            this.match = this.href.match(new RegExp('\\b' + window.location.hostname + '\\b', 'i'));

                            if (this.match == null && this.match != 'undefined')
                            {
                                window.sendContent.affUrls.push({
                                    text      : this.text,
                                    href      : this.href,
                                    classAttr : 'prosp-pl-affrep' + i
                                });
                            }
                        }
                    }
                }
            },

            /**
             * does the replacements on hrefs for affiliate urls
             *
             * @return void
             */
            replace : function(rw)
            {
                if (rw.length > 0 && rw != null && rw != 'undefined')
                {
                    jqP('a').each(function(){
                        jqP(this).click(function(){

                            for (var i=0;i<=rw.length-1;++i)
                            {
                                if (jqP(this).hasClass(rw[i][0].classAttr) == true)
                                {
                                    jqP(this).attr('href', 'javascript:void(0);');
                                    location.href = rw[i][0].affiliate_url;
                                }
                            }
                        });
                    });
                }
            }
        };

        // instantiate affUrls
        affUrls.match()

        // success method
        var s = function (cor){

            // if this is the first request, no memcache
            if (cor.responseText == 2)
                return req(2);

            // no results
            if (cor.responseText == null)
                return;
//console.log(cor.responseText);return;
            parsed = jqP.parseJSON(cor.responseText);
//console.log(parsed);return;
            if (parsed == null || parsed == 'undefined')
                return;

            resp = parsed.matches;  // the normal results
            rw   = parsed.rewrites; // the aff urls to rewrite

            var p = -1;

            // get each result and traverse the dom for replacements
            jqP(resp).each(function(){
                p += 1;
                this.which = p;
                if (this != 'undefined' && this.keyword != null && this.productId != '')
                {
                    var f = findAndReplace(this, p);
                }
            });

            // replace affiliate urls, skip only if set to false
            if (typeof prosperent_pl_enableLinkAffiliation === 'undefined' || prosperent_pl_enableLinkAffiliation == true)
            {
                if (rw != null && rw != 'undefined')
                {
                    affUrls.replace(rw);
                }
            }

            // click event for links, redirecting to aff. urls
            jqP('a.plinker').each(function(){
                jqP(this).click(function(){

                    for (var i=0;i<=resp.length-1;i++)
                    {
                        var lClass = jqP(this).attr('id'),
                        query      = resp[i].query.replace(/\s{1,}|[^a-zA-Z0-9]/g, '');

                        // check matching of id attributes to the query so looping does not confuse itself
                        if (lClass.replace(/prosperlink-/g, '') == resp[i].which)
                        {
                            // need this so url isn't appended with keyword masking if returned to the page by using the back button
                            jqP(this).attr('href', 'javascript:void(0);');

                            // redirecting
                            location.href = resp[i].affiliate_url;
                        }
                    }
                });
            });

            // creating elements on page
            boxy = function(properties){
                el = document.createElement(properties.el);
                jqP(properties.att).each(function(){
                    el.setAttribute(this.name, this.av);
                });

                return el;
            };

            // if hover boxes are enabled
            if (typeof prosperent_pl_hoverBox !== 'undefined' && prosperent_pl_hoverBox == true)
            {
                // displaying the hover boxes
                function boxes(wWidth)
                {
                    var inc = -1;

                    jqP('a.plinker').each(function(){
                        inc += 1;

                        var lClass = jqP(this).attr('id'),
                            pos    = jqP(this).offset();

                        for (var i=0;i<=resp.length-1;i++)
                        {
                            query = resp[i].query.replace(/^\d+|\s{1,}|[^a-zA-Z0-9]/g, '');

                            // check matching of id attributes to the increment so multiple occurences do not get linked
                            if (lClass.replace(/prosperlink-/g, '') == resp[i].which)//.replace(/\d+_prosperlink_|[^a-zA-Z0-9]/g, '') == query)
                            {

                                //console.log(alreadyLinked);
                                resp[i].keyword = resp[i].keyword != null ? resp[i].keyword : '';

                                var kw = resp[i].keyword.length > 70 && resp[i].isCoupon != null ? resp[i].keyword.slice(0, 70) + ' ...'
                                                                         : resp[i].keyword.length <=40 ? resp[i].keyword + '<br/>'
                                                                         : resp[i].keyword == null ? '' : resp[i].keyword;

                                var els = {
                                    // create an anchor tag wrapper for the div box
                                    'aWrap' : {
                                        'el'  : 'a',
                                        'att' : [
                                            {'name' : 'id', 'av'     : 'prosperlink_hover-' + inc},
                                            {'name' : 'target', 'av' : '_blank'},
                                            {'name' : 'href', 'av'   : resp[i].affiliate_url},
                                            {'name' : 'className', 'av'  : (jqP.browser.msie && jqP.browser.version <=7) ? 'prosperlink-a' : ''},
                                            {'name' : 'class', 'av'  : (!jqP.browser.version <=7) ? 'prosperlink-a' : ''}
                                        ]
                                    },

                                    // div inside anchor wrapper
                                    'divWrapped' : {
                                        'el'  : 'div',
                                        'att' : [
                                            {'name' : 'id', 'av'     : 'div_prosperlink_hover' + query + '_' + inc},
                                            {'name' : 'target', 'av' : '_blank'},
                                            {'name' : 'href', 'av'   : resp[i].affiliate_url},
                                            {'name' : 'className', 'av'  : (jqP.browser.msie && jqP.browser.version <=7) ? 'prosp_hover' + query + ' prosperent-pl' : ''},
                                            {'name' : 'class', 'av'  : (!jqP.browser.version <=7) ? 'prosp_hover' + query + ' prosperent-pl' : ''}
                                        ]
                                    }
                                };


                                a   = boxy(els.aWrap);
                                div = boxy(els.divWrapped);

                                var divBox = {
                                    'imgCoup' : '<div class="prosperent-img-wrap-coup"><img src="' + resp[i].image_url + '" class="prosperent-img-pl"/></div>',
                                    'img'     : '<div class="prosperent-img-wrap"><img src="' + resp[i].image_url + '" class="prosperent-img-pl"/></div>',
                                    'kw'      : '<span class="prosperent-kw-pl">' + kw + '</span>',
                                    'byPl'    : '<span class="prosperent-linkadd-pl">Link Added by <span class="prosperent-blue-pl"><a href="http://prosperent.com/ref/' +
                                                prosperent_pl_uid + '" class="prosperent-ref-pl">ProsperLinks</a></span></span>'
                                };

                                // coupons and a coupon code
                                if (resp[i].isCoupon && resp[i].coupon_code != '' && resp[i].coupon_code != 'null')
                                    div.innerHTML = [divBox.imgCoup, '<div style="float:right;">', divBox.kw, '<br/>', resp[i].coupon_code, divBox.byPl, '</div>'].join('');

                                // coupons but no coupon code
                                else if (resp[i].isCoupon && (resp[i].coupon_code == '' || resp[i].coupon_code == 'null'))
                                    div.innerHTML = [divBox.imgCoup, divBox.kw, divBox.byPl].join('');

                                // no coupons
                                else
                                {
                                    var m  = resp[i]['merchant'].length > 15 ? resp[i]['merchant'].slice(0, 15) + ' ...' : resp[i]['merchant'];

                                    div.innerHTML = [divBox.img, '<span class="prosperent-price-pl">$', resp[i].price + '<span class="prosperent-linksold-pl">Sold by ',
                                                     '<span class="prosperent-blue-pl">',m,'</span></span></span>', divBox.kw, divBox.byPl].join('');
                                }

                                a.appendChild(div);
                                document.body.appendChild(a);

                                var divs    = jqP('div.prosp_hover' + query),
                                    getH    = pos.top - divs.height() - 30;

                                // position the boxes
                                divs.css({'left' : pos.left, 'top' : getH, 'display' : 'none'});

                                // prevents box from hovering outside window width boundary
                                if (pos.left + divs.width() + 20 >= wWidth)
                                    divs.css({'left' : pos.left - jqP(divs).width() - 25});

                                // prevents box from hovering outside window height boundary
                                if (getH < 0)
                                    divs.css({'top' : divs.height() * .4 + 20});

                                // hovering over link
                                jqP(this).hover(function(){
                                    divs.clearQueue();
                                    jqP('div.prosperent-pl').hide();
                                    divs.show();
                                });

                                // mouseleave on an element
                                var leave = function(what)
                                {
                                    jqP(what).mouseleave(function(e){
                                        e.stopPropagation();
                                        divs.clearQueue().delay(2000).queue(function(){
                                            divs.hide();
                                        });
                                    });
                                };

                                // hover on box
                                divs.hover(function(e){
                                    e.stopPropagation();
                                    divs.clearQueue().show();
                                    leave(divs);
                                });

                                // hide box on body click
                                jqP(document).click(function(e){
                                    divs.hide();
                                });

                                // leaving the box open for duration of 2 sec
                                leave(this);
                            }
                        }
                    });
                }

                var lastWindowWidth  = jqP(window).width();

                // show the hover boxes
                boxes(lastWindowWidth);

                // need this to keep positioning if window is resized
                // remove the elements, then add them again, so there are no duplicates on the page
                // need the timer, especially for ie7, otherwise ie7 confuses itself on looping
                var adjustTimer;
                jqP(window).resize(function() {
                    clearTimeout(adjustTimer);
                    adjustTimer = setTimeout(function()
                    {
                        // confirm window was actually resized
                        if ((jqP(window).width() != lastWindowWidth))
                        {
                            // set this windows size
                            lastWindowWidth = jqP(window).width();

                            // remove the links
                            jqP('a.prosperlink-a').remove();

                            // inserts them again, no duplicates
                            boxes(lastWindowWidth);
                        }
                    }, 100);
                });
            }
        },

        url = 'http://prosperent.com/affiliate/prosplinks/index';

        // the request method
        function req(num)
        {
            var data = {
                'uid'     : prosperent_pl_uid,
                'req'     : num,
                'limit'   : prosperent_pl_limit,
                'bro'     : (jqP.browser.msie ? 'ie' : 'non-ie'),
                'url'     : (document.URL ? document.URL : document.location.href)
            };

            if (num == 2)
            {
                data.sid = prosperent_pl_sid;
                data.content = sendContent;
            }

            try {var cor = new XMLHttpRequest;} catch(e){}

            // request in IE
            if (jqP.browser.msie && window.XDomainRequest)
            {
                var b = new XDomainRequest;
                b && (b.open('POST', url), b.onload = function ()
                {
                    try { s(b);}
                    catch(e){}
                }, b.onerror = function ()
                {}, b.onprogress = function ()
                {}, b.ontimeout = function ()
                {}, b.async = !0, b.send(jqP.param(data)))

                return false;
            }

            // request for other browsers
            jqP.ajax({
                type: 'POST',
                url: url,
                data: data,
                xhrFields: {
                    withCredentials: false
                },
                complete: function(response, status)
                {
                    s(response);
                    return false;
                }
            });
        }

        // traverses the DOM searching for matches
        function findAndReplace(prodData, p, searchNode)
        {
            if (!prodData.query || typeof prodData.affiliate_url === 'undefined')
                return; // Throw error here

            // define the variables
            var regex      = typeof prodData.query === 'string' ? new RegExp('\\b' + prodData.query + '\\b', 'i') : prodData.query,
                space      = new RegExp('\\b' + prodData.query + '\\b\\s{1}'),
                childNodes = (searchNode || document.body).childNodes,
                cnLength   = childNodes.length,
                par,

                // styling of links (underlining)
                uLine      = typeof prosperent_pl_underline === 'undefined' || prosperent_pl_underline == 1 ? 'text-decoration:underline;' : 'text-decoration:none;',
                uLine      = typeof prosperent_pl_underline !== 'undefined' && prosperent_pl_underline == 2 ? 'text-decoration:none;border-bottom:3px double;' : uLine,
                uLine      = typeof prosperent_pl_underline !== 'undefined' && prosperent_pl_underline == 'none' ? 'text-decoration:none;' : uLine,

                // elements not to be searched when traversing DOM for matches
                excludes   = 'html,head,style,,header,footer,title,link,meta,script,object,iframe,h1,h2,h3,h4,h5,h6,a,button,input,cite,q,applet,param,select,option,svg,strong,textarea,noscript,dt,dd,dl,var,img,caption,code,abbr,label',
                ids        = ['sidebar','footer','header','navbar','subnavbar','seo_links','thread_info','similar_threads','options_block_container'],
                cls        = ['sub','jhl','meta','blog_entry_date','header','sig','smallfont','postmeta','h1','h2','h3','h4','h5','h6','after_content','posthead','gB','twitter_box'];

            for(var i=0;i<=cnLength-1;i++)
            {
                var currentNode = childNodes[i];

                // mainly for wordpress
                if (jqP.inArray(jqP(currentNode).attr('id'), ids) != -1 || jqP.inArray(jqP(currentNode).attr('class'), cls) != -1)
                    continue;//console.log('dgfg');

                // element node, keep traversing
                if (currentNode.nodeType === 1 && (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1)
                    arguments.callee(prodData, p, currentNode);

                // not a text node, or a text node but no match
                if (currentNode.nodeType !== 3 || !regex.test(currentNode.data))
                    continue;

                var match = currentNode.data.match(new RegExp('\\b' + prodData.query + '\\b', 'i'));

                // if the prosperlink does not exist yet. (prevents linking multiple occurences of same term)
                if (jqP.inArray(prodData.query, window.alreadyLinked) <= -1)
               // if (jqP('a').hasClass('prosperlink_' + prodData.query.replace(/\s{1,}|_\d+$/g, '')) == false)
                {
                    window.alreadyLinked.push(prodData.query);
                    // create link element here, wrapped inside of span tag
                    var b = document.createElement('span'),
                        a = document.createElement('a');

                        // ie7 needs className because it sucks
                        if (jqP.browser.msie && jqP.browser.version <=7)
                            a.setAttribute('className', 'plinker');

                        // non IE class names
                       // else
                            a.setAttribute('class', 'plinker');

                        // hover box not enabled, show title
                        if (typeof prosperent_pl_hoverBox === 'undefined' || prosperent_pl_hoverBox == false) a.setAttribute('title', 'Link Added by ProsperLinks');

                        a.setAttribute('id', 'prosperlink-' + p);//+ prodData.query.replace(/\s{1,}/g, ''));
                        a.setAttribute('style', uLine);
                        a.href = '#' + prodData.query.replace(/[^a-zA-Z0-9\s{1,}]/g, '');
                        a.appendChild(document.createTextNode(match));

                        b.appendChild(a);

                    // regex based on IE or not, if IE, we're checking for possible occurence of extra whitespace
                    var check  = space.test(currentNode.data) == true && jqP.browser.msie && parseInt(jqP.browser.version) <=8 ? space : regex,
                        repl   = check == space ? b.innerHTML + '&nbsp;' : b.innerHTML,
                        parent = currentNode.parentNode,

                        // create a document fragment which will replace the current node later
                        frag   = (function()
                            {
                                var html = (currentNode.data ? currentNode.data : currentNode.childNodes[0].data).replace(check, repl),
                                    wrap = document.createElement('span'),
                                    frag = document.createDocumentFragment();

                                wrap.innerHTML = html;

                                // IE bug fix, checking for presence or absence of whitespace concatenated to string
                                if (jqP.browser.msie && parseInt(jqP.browser.version) <=8)
                                {
                                    wrap.innerHTML = 'jqp~' + html;
                                    wrap.innerHTML = wrap.innerHTML.replace(/jqp~\s{1}/g,'&nbsp;').replace(/jqp~/g,' ');
                                }

                                while (wrap.firstChild)
                                {
                                    frag.appendChild(wrap.firstChild);
                                }

                                return frag;
                            })();

                    // replace parent with newly created fragment
                    parent.replaceChild(frag, currentNode);

                    // mainly used for hover boxes if enabled, otherwise will not be used
                    return prodData.query.replace(/\s{1,}/g,'');
                }
            }
        }

        // do the initial request
        req(1);
    });
});
