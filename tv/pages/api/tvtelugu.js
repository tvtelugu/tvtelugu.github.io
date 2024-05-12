// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from "cross-fetch";

const getUserChanDetails = async () => {
    let hmacValue;
    let obj = { list: [] };

    try {
        const responseHmac = await fetch("https://tplayapi.code-crafters.app/321codecrafters/hmac.json");
        const data = await responseHmac.json();
        hmacValue = data.data.hmac.hdtl.value;
    } catch (error) {
        console.error('Error fetching and rearranging HMAC data:', error);
        return obj;
    }

    try {
        const responseChannels = await fetch("https://tplayapi.code-crafters.app/321codecrafters/fetcher.json");
        const cData = await responseChannels.json();

        if (cData && cData.data && Array.isArray(cData.data.channels)) {
            const flatChannels = cData.data.channels.flat();
            flatChannels.forEach(channel => {
                let firstGenre = channel.genres && channel.genres.length > 0 ? channel.genres[0] : null;
                let rearrangedChannel = {
                    id: channel.id,
                    name: channel.name,
                    tvg_id: channel.tvg_id,
                    group_title: firstGenre,
                    tvg_logo: channel.logo_url,
                    stream_url: channel.manifest_url,
                    license_url: channel.license_url,
                    stream_headers: channel.manifest_headers ? (channel.manifest_headers['User-Agent'] || JSON.stringify(channel.manifest_headers)) : null,
                    drm: channel.drm,
                    is_mpd: channel.is_mpd,
                    kid_in_mpd: channel.kid_in_mpd,
                    hmac_required: channel.hmac_required,
                    key_extracted: channel.key_extracted,
                    pssh: channel.pssh,
                    clearkey: channel.clearkeys ? JSON.stringify(channel.clearkeys[0].base64) : null,
                    hma: hmacValue
                };
                obj.list.push(rearrangedChannel);
            });
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return obj;
    }

    return obj;
};

const generateM3u = async (ud) => {
    let m3uStr = '';

    let userChanDetails = await getUserChanDetails();
    let chansList = userChanDetails.list;


            m3uStr = '#EXTM3U x-tvg-url="https://avkb.short.gy/tsepg.xml.gz"\n';


    
            m3uStr += '\n';
            m3uStr += '🕊 𝕋𝕍𝕋𝔼𝕃𝕌𝔾𝕌 - 𝔼𝕩𝕔𝕝𝕦𝕤𝕚𝕧𝕖 𝕋𝕒𝕥𝕒 ℙ𝕝𝕒𝕪𝕝𝕚𝕤𝕥\n';
            m3uStr += 'Join Our Telegram Channel @ https://t.me/tvtelugu\n\n';

    
            for (let i = 0; i < chansList.length; i++) {
        m3uStr += '#EXTINF:-1 tvg-id="' + chansList[i].id.toString() + '" ';
        m3uStr += 'group-title="🕊 TataPlay", tvg-logo="https://mediaready.videoready.tv/tatasky-epg/image/fetch/f_auto,fl_lossy,q_auto,h_250,w_250/' + (chansList[i].tvg_logo) + '", ' + chansList[i].name + '\n';
        m3uStr += '#KODIPROP:inputstream.adaptive.license_type=clearkey\n';
        m3uStr += '#KODIPROP:inputstream.adaptive.license_key=' + chansList[i].clearkey + '\n';
        m3uStr += '#EXTVLCOPT:http-user-agent=' + chansList[i].stream_headers + '\n';
        m3uStr += '#EXTHTTP:{"cookie":"' + chansList[i].hma + '"}\n';
        m3uStr += chansList[i].stream_url + '|cookie:' + chansList[i].hma + '\n\n';
}


m3uStr += '🕊 𝕁𝕚𝕠𝕋𝕍+ 𝕓𝕪 𝕋𝕍𝕋𝔼𝕃𝕌𝔾𝕌\n';
m3uStr += '\n';

m3uStr += '#EXTINF:-1 tvg-id="629" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Telugu.png" group-title="🎭 Telugu - JioTV+",ETV Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=629&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="638" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Telugu.png" group-title="🎭 Telugu - JioTV+",Zee Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=638&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="692" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Plus.png" group-title="🎭 Telugu - JioTV+",ETV Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=692&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="729" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gemini_Comedy.png" group-title="🎭 Telugu - JioTV+",Gemini Comedy\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=729&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="734" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vissa_TV.png" group-title="🎭 Telugu - JioTV+",Vissa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=734&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="897" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gemini_TV_HD.png" group-title="🎭 Telugu - JioTV+",Gemini TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=897&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1354" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Telugu_HD.png" group-title="🎭 Telugu - JioTV+",Zee Telugu HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1354&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1973" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_HD.png" group-title="🎭 Telugu - JioTV+",ETV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1973&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2956" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Plus_HD.png" group-title="🎭 Telugu - JioTV+",ETV Plus HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2956&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="614" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Andhra_pradesh.png" group-title="🎭 Telugu - JioTV+",ETV Andhra pradesh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=614&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="630" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Telangana.png" group-title="🎭 Telugu - JioTV+",ETV Telangana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=630&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="632" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sakshi_tv.png" group-title="🎭 Telugu - JioTV+",Sakshi tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=632&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="646" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NTV.png" group-title="🎭 Telugu - JioTV+",NTV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=646&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="664" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_News_Telugu.png" group-title="🎭 Telugu - JioTV+",Raj News Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=664&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="665" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/HM_TV.png" group-title="🎭 Telugu - JioTV+",HM TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=665&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="666" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABN_Andhra_Jyothi.png" group-title="🎭 Telugu - JioTV+",ABN Andhra Jyothi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=666&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="667" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/T_News.png" group-title="🎭 Telugu - JioTV+",T News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=667&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="668" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV_5_News.png" group-title="🎭 Telugu - JioTV+",TV 5 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=668&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="671" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sathiyam.png" group-title="🎭 Telugu - JioTV+",Sathiyam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=671&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="769" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/V6_News.png" group-title="🎭 Telugu - JioTV+",V6 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=769&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="784" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CVR_News.png" group-title="🎭 Telugu - JioTV+",CVR News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=784&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="790" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/I_News.png" group-title="🎭 Telugu - JioTV+",I News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=790&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="832" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/10_TV.png" group-title="🎭 Telugu - JioTV+",10 TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=832&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1274" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Studio_One.png" group-title="🎭 Telugu - JioTV+",Studio One\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1274&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2932" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/99TV.png" group-title="🎭 Telugu - JioTV+",99 TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2932&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1773" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_4_HD_Telugu.png" group-title="🎭 Telugu - JioTV+",Sony Ten 4 HD Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1773&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1775" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_4_Telugu.png" group-title="🎭 Telugu - JioTV+",Sony Ten 4 Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1775&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="252" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Cinema.png" group-title="🎭 Telugu - JioTV+",ETV Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=252&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="413" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Cinemalu.png" group-title="🎭 Telugu - JioTV+",Zee Cinemalu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=413&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="684" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gemini_Life.png" group-title="🎭 Telugu - JioTV+",Gemini Life\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=684&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="899" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gemini_Movies_HD.png" group-title="🎭 Telugu - JioTV+",Gemini Movies HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=899&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1363" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Cinemalu_HD.png" group-title="🎭 Telugu - JioTV+",Zee Cinemalu HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1363&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1665" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Cinema_HD.png" group-title="🎭 Telugu - JioTV+",ETV Cinema HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1665&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="570" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Life.png" group-title="🎭 Telugu - JioTV+",ETV Life\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=570&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="576" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Channel_Telugu.png" group-title="🎭 Telugu - JioTV+",Discovery Channel Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=576&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="577" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/History_18_Telugu.png" group-title="🎭 Telugu - JioTV+",History TV18 HD Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=577&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="774" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CVR_Health.png" group-title="🎭 Telugu - JioTV+",CVR Health\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=774&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="775" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vanitha.png" group-title="🎭 Telugu - JioTV+",Vanitha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=775&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="565" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Abhiruchi.png" group-title="🎭 Telugu - JioTV+",ETV Abhiruchi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=565&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="543" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Telugu.png" group-title="🎭 Telugu - JioTV+",Nick Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=543&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="558" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kushi_TV.png" group-title="🎭 Telugu - JioTV+",Kushi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=558&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="874" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Yay_Telugu.png" group-title="🎭 Telugu - JioTV+",Sony Yay Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=874&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1080" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CN_HD_Telugu.png" group-title="🎭 Telugu - JioTV+",CN HD+ Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1080&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1242" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sonic_Telugu.png" group-title="🎭 Telugu - JioTV+",Sonic Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1242&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1883" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pogo_Telugu.png" group-title="🎭 Telugu - JioTV+",Pogo Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1883&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="598" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sri_Venkateshwar_Bhakti.png" group-title="🎭 Telugu - JioTV+",Sri Venkateshwar Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=598&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="772" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CVR_OM_Spiritual.png" group-title="🎭 Telugu - JioTV+",CVR OM Spiritual\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=772&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="776" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhakti_TV.png" group-title="🎭 Telugu - JioTV+",Bhakti TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=776&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="777" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aradhana_TV.png" group-title="🎭 Telugu - JioTV+",Aradhana TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=777&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="955" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hindu_Dharmam.png" group-title="🎭 Telugu - JioTV+",Hindu Dharmam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=955&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1254" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aastha_Telugu.png" group-title="🎭 Telugu - JioTV+",Aastha Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1254&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1850" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SVBC.png" group-title="🎭 Telugu - JioTV+",SVBC\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1850&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1975" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PMC_Telugu.png" group-title="🎭 Telugu - JioTV+",PMC Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1975&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="737" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Music_Telugu.png" group-title="🎭 Telugu - JioTV+",Raj Music Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=737&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="898" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gemini_Music_HD.png" group-title="🎭 Telugu - JioTV+",Gemini Music HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=898&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2745" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saregama_Telugu.png" group-title="🎭 Telugu - JioTV+",Saregama Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2745&e=.m3u8\n\n';





m3uStr += '🕊 𝕄𝕠𝕧𝕚𝕖𝕤 𝕓𝕪 𝕋𝕍𝕋𝔼𝕃𝕌𝔾𝕌\n';
m3uStr += '\n';


    
    
    
    
m3uStr += '#EXTINF:-1,Umma (2022)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/325496.mp4\n\n';
m3uStr += '#EXTINF:-1,Nede Vidudala (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/325498.mp4\n\n';
m3uStr += '#EXTINF:-1,Prasanna Vadanam (2024) (CAM)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/325499.mp4\n\n';
m3uStr += '#EXTINF:-1,Joe Bell (2020) (Telugu)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/325495.mp4\n\n';
m3uStr += '#EXTINF:-1,Manjummel Boys (2024) (Multi Audio)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323900.mp4\n\n';
m3uStr += '#EXTINF:-1,OMG 2 (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/319769.mp4\n\n';
m3uStr += '#EXTINF:-1,Bhimaa (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/319770.mp4\n\n';
m3uStr += '#EXTINF:-1,The Beekeeper (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/320222.mp4\n\n';
m3uStr += '#EXTINF:-1,The Family Star (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/320427.mp4\n\n';
m3uStr += '#EXTINF:-1,Tillu Square (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/320428.mp4\n\n';
m3uStr += '#EXTINF:-1,Lineman (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/320700.mp4\n\n';
m3uStr += '#EXTINF:-1,DeAr (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/321745.mp4\n\n';
m3uStr += '#EXTINF:-1,Byri Pagam 1 (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/322621.mp4\n\n';
m3uStr += '#EXTINF:-1,Pranaya Vilasam (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323197.mp4\n\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/316864.mp4\n\n';
m3uStr += '#EXTINF:-1,Siren (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/316953.mp4\n\n';
m3uStr += '#EXTINF:-1,My Dear Donga (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/316956.mp4\n\n';
m3uStr += '#EXTINF:-1,Madame Web (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/317504.mp4\n\n';
m3uStr += '#EXTINF:-1,Gaami (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314077.mp4\n\n';
m3uStr += '#EXTINF:-1,Om Bheem Bush (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314080.mp4\n\n';
m3uStr += '#EXTINF:-1,Premalu (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314075.mp4\n\n';    
m3uStr += '#EXTINF:-1,Hanu-Man (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/301035.mp4\n\n';
m3uStr += '#EXTINF:-1,Kung Fu Panda 4 (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/312536.mp4\n\n';
m3uStr += '#EXTINF:-1,Kajal Karthika (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/312537.mp4\n\n';
m3uStr += '#EXTINF:-1,Sharma & Ambani (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/313433.mp4\n\n';
m3uStr += '#EXTINF:-1,Amar Singh Chamkila (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314072.mp4\n\n';
m3uStr += '#EXTINF:-1,Anubhavinchu Raja (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314073.mp4\n\n';
m3uStr += '#EXTINF:-1,Aa Okkati Adakku (2024)(CAM)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323815.mp4\n\n';
m3uStr += '#EXTINF:-1,Happy Ending (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323206.mp4\n\n';
m3uStr += '#EXTINF:-1,Siddharth Roy (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323605.mp4\n\n';
m3uStr += '#EXTINF:-1,Ajay Gadu (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/269133.mp4\n\n';
m3uStr += '#EXTINF:-1,Lift (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/269699.mp4\n\n';
m3uStr += '#EXTINF:-1,Sarkaaru Noukari (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/269715.mp4\n\n';
m3uStr += '#EXTINF:-1,Little Miss Naina (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/275766.mp4\n\n';
m3uStr += '#EXTINF:-1,Badland Hunters (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/275957.mp4\n\n';
m3uStr += '#EXTINF:-1,Orion and the Dark (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/278819.mp4\n\n';
m3uStr += '#EXTINF:-1,Saindhav (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/279520.mp4\n\n';
m3uStr += '#EXTINF:-1,Captain Miller (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/283133.mp4\n\n';
m3uStr += '#EXTINF:-1,Bubble Gum (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/283138.mp4\n\n';
m3uStr += '#EXTINF:-1,Guntur Kaaram (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/283141.mp4\n\n';
m3uStr += '#EXTINF:-1,Bhakshak (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/283332.mp4\n\n';
m3uStr += '#EXTINF:-1,Valentines Night (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/286179.mp4\n\n';
m3uStr += '#EXTINF:-1,The Kerala Story (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/286383.mp4\n\n';
m3uStr += '#EXTINF:-1,Bhamakalapam 2 (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/286384.mp4\n\n';
m3uStr += '#EXTINF:-1,Naa Saami Ranga (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/287049.mp4\n\n';
m3uStr += '#EXTINF:-1,Rakshakudu (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288693.mp4\n\n';
m3uStr += '#EXTINF:-1,Two Souls (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288694.mp4\n\n';
m3uStr += '#EXTINF:-1,Odavum Mudiyadhu Oliyavum Mudiyadhu (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288695.mp4\n\n';
m3uStr += '#EXTINF:-1,Geetasakshigaa (2023)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288696.mp4\n\n';
m3uStr += '#EXTINF:-1,Regina (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288697.mp4\n\n';
m3uStr += '#EXTINF:-1,Sheesh Mahal (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/288698.mp4\n\n';
m3uStr += '#EXTINF:-1,Mea Culpa (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/289612.mp4\n\n';
m3uStr += '#EXTINF:-1,Bootcut Balaraju (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/290572.mp4\n\n';
m3uStr += '#EXTINF:-1,Game On (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/290940.mp4\n\n';
m3uStr += '#EXTINF:-1,Code 8 Part II (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/291987.mp4\n\n';
m3uStr += '#EXTINF:-1,Ambajipeta Marriage Band (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/292181.mp4\n\n';
m3uStr += '#EXTINF:-1,Eagle (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/292789.mp4\n\n';
m3uStr += '#EXTINF:-1,My Name Is Loh Kiwan (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/293082.mp4\n\n';
m3uStr += '#EXTINF:-1,Spaceman (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/293096.mp4\n\n';
m3uStr += '#EXTINF:-1,Question Mark (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/294805.mp4\n\n';
m3uStr += '#EXTINF:-1,Valari (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/295039.mp4\n\n';
m3uStr += '#EXTINF:-1,Anweshippin Kandethum (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/296072.mp4\n\n';
m3uStr += '#EXTINF:-1,Damsel (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/296073.mp4\n\n';
m3uStr += '#EXTINF:-1,Merry Christmas (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/296074.mp4\n\n';
m3uStr += '#EXTINF:-1,Ooru Peru Bhairavakona (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/296082.mp4\n\n';
m3uStr += '#EXTINF:-1,To Kill a Tiger (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/298575.mp4\n\n';
m3uStr += '#EXTINF:-1,No Way Up (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299059.mp4\n\n';
m3uStr += '#EXTINF:-1,Bramayugam (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299078.mp4\n\n';
m3uStr += '#EXTINF:-1,Mix-Up (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299081.mp4\n\n';
m3uStr += '#EXTINF:-1,Razakar: The Silent Genocide of Hyderabad (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299661.mp4\n\n';
m3uStr += '#EXTINF:-1,Irish Wish (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299663.mp4\n\n';
m3uStr += '#EXTINF:-1,Murder Mubarak (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299664.mp4\n\n';
m3uStr += '#EXTINF:-1,Thundu (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/299665.mp4\n\n';
m3uStr += '#EXTINF:-1,Abraham Ozler (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/302014.mp4\n\n';
m3uStr += '#EXTINF:-1,Ae Watan Mere Watan (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/302945.mp4\n\n';
m3uStr += '#EXTINF:-1,Road House (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/303389.mp4\n\n';
m3uStr += '#EXTINF:-1,Operation Valentine (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/303927.mp4\n\n';
m3uStr += '#EXTINF:-1,Bhoothaddam Bhaskar Narayana (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/303936.mp4\n\n';
m3uStr += '#EXTINF:-1,RAM Rapid Action Mission (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/305697.mp4\n\n';
m3uStr += '#EXTINF:-1,Lover (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/305706.mp4\n\n';
m3uStr += '#EXTINF:-1,One Not Five Minuttess (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/306766.mp4\n\n';
m3uStr += '#EXTINF:-1,Sundaram Master (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/306774.mp4\n\n';
m3uStr += '#EXTINF:-1,The Wages of Fear (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/307194.mp4\n\n';
m3uStr += '#EXTINF:-1,Double Engine (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/307195.mp4\n\n';
m3uStr += '#EXTINF:-1,Masthu Shades Unnai Ra (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/307196.mp4\n\n';
m3uStr += '#EXTINF:-1,Kismat (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/309762.mp4\n\n';
m3uStr += '#EXTINF:-1,Lambasingi (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/309763.mp4\n\n';
m3uStr += '#EXTINF:-1,Vivekam: Who Killed Babai (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/309764.mp4\n\n';
m3uStr += '#EXTINF:-1,Adhrushyam (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/310775.mp4\n\n';
m3uStr += '#EXTINF:-1,Chaari 111 (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/310812.mp4\n\n';
m3uStr += '#EXTINF:-1,Tantra (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/310814.mp4\n\n';
m3uStr += '#EXTINF:-1,Scoop (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/311232.mp4\n\n';
m3uStr += '#EXTINF:-1,Rebel (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/311473.mp4\n\n';
m3uStr += '#EXTINF:-1,Woody Woodpecker Goes to Camp (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314076.mp4\n\n';
m3uStr += '#EXTINF:-1,Yatra 2 (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/314081.mp4\n\n';
m3uStr += '#EXTINF:-1,Madura Veera (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/315966.mp4\n\n';
m3uStr += '#EXTINF:-1,Gem (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/316854.mp4\n\n';
m3uStr += '#EXTINF:-1,Rama Ayodhya (2024)\n';
m3uStr += '#EXTINF:-1,Rebel Moon - Part Two The Scargiver (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/317505.mp4\n\n';
m3uStr += '#EXTINF:-1,Amitabh (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/318476.mp4\n\n';
m3uStr += '#EXTINF:-1,The Idea of You (2024)\n';
m3uStr += 'http://starshare.live:8080/movie/Stella/Stella/323198.mp4\n\n';


m3uStr += '🕊 𝕎𝕖𝕓𝕊𝕖𝕣𝕚𝕖𝕤 𝕓𝕪 𝕋𝕍𝕋𝔼𝕃𝕌𝔾𝕌\n';
m3uStr += '\n';



m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/318462.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319203.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319947.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320716.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320715.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E06\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322125.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E07\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322642.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E08\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322640.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E09\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/323322.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E10\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/323767.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E11\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/325537.mp4\n\n';
m3uStr += '#EXTINF:-1,MasterChef India – Telugu S01 E12\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/326661.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/303486.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/303487.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/306543.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/310228.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/313434.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E06\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316690.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E07\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319723.mp4\n\n';
m3uStr += '#EXTINF:-1,Lootere (Telugu) S01 E08\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322643.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322589.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322590.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322591.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322592.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322593.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E06\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322594.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E07\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322595.mp4\n\n';
m3uStr += '#EXTINF:-1,Heeramandi: The Diamond Bazaar (Telugu) S01 E08\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/322596.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320241.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320242.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320243.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320244.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320245.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E06\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320246.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E07\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320247.mp4\n\n';
m3uStr += '#EXTINF:-1,Dead Boy Detectives (Telugu) S01 E08\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/320248.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319798.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319799.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319800.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319801.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319802.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E06\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319803.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E07\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319804.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E08\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319805.mp4\n\n';
m3uStr += '#EXTINF:-1,Ranneeti: Balakot & Beyond (Telugu) S01 E09\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/319806.mp4\n\n';
m3uStr += '#EXTINF:-1,Tharagathi Gadhi Daati (Telugu) S01 E01\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316428.mp4\n\n';
m3uStr += '#EXTINF:-1,Tharagathi Gadhi Daati (Telugu) S01 E02\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316429.mp4\n\n';
m3uStr += '#EXTINF:-1,Tharagathi Gadhi Daati (Telugu) S01 E03\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316430.mp4\n\n';
m3uStr += '#EXTINF:-1,Tharagathi Gadhi Daati (Telugu) S01 E04\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316431.mp4\n\n';
m3uStr += '#EXTINF:-1,Tharagathi Gadhi Daati (Telugu) S01 E05\n';
m3uStr += 'http://starshare.live:8080/series/Stella/Stella/316432.mp4\n\n';



m3uStr += '#EXTINF:-1 tvg-id="714" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Girnar.png" group-title="🌟India - JioTV+",DD Girnar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=714&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="715" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Punjabi.png" group-title="🌟India - JioTV+",DD Punjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=715&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="716" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Kashir.png" group-title="🌟India - JioTV+",DD Kashir\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=716&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="719" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nepal_one.png" group-title="🌟India - JioTV+",Nepal one\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=719&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="720" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD13_Guwahati_NE.png" group-title="🌟India - JioTV+",DD13 Guwahati NE\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=720&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="723" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Amrita_TV.png" group-title="🌟India - JioTV+",Amrita TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=723&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="726" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD5_Podhigai.png" group-title="🌟India - JioTV+",DD5 Podhigai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=726&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="727" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vasanth_TV.png" group-title="🌟India - JioTV+",Vasanth TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=727&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="731" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kairali_WE_TV.png" group-title="🌟India - JioTV+",Kairali WE TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=731&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="733" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Udaya_Comedy.png" group-title="🌟India - JioTV+",Udaya Comedy\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=733&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="736" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Maiboli.png" group-title="🌟India - JioTV+",Maiboli\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=736&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="765" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jonack.png" group-title="🌟India - JioTV+",Jonack\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=765&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="785" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Super.png" group-title="🌟India - JioTV+",Colors Super\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=785&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="796" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Peppers_TV.png" group-title="🌟India - JioTV+",Peppers TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=796&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="824" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Puthu_Yugam.png" group-title="🌟India - JioTV+",Puthu Yugam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=824&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="844" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mazavali_Manorama_HD.png" group-title="🌟India - JioTV+",Mazavali Manorama HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=844&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="847" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MK_TV.png" group-title="🌟India - JioTV+",MK TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=847&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="857" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vendhar_TV.png" group-title="🌟India - JioTV+",Vendhar TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=857&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="866" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Exclusive.png" group-title="🌟India - JioTV+",Jio Exclusive HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=866&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="900" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Surya_HD.png" group-title="🌟India - JioTV+",Surya HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=900&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="708" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Makkal_TV.png" group-title="🌟India - JioTV+",Makkal TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=708&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="709" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Adithya_TV.png" group-title="🌟India - JioTV+",Adithya TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=709&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="710" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kairali_TV.png" group-title="🌟India - JioTV+",Kairali TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=710&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="712" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_urdu.png" group-title="🌟India - JioTV+",DD urdu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=712&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="713" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD9_chandana_kannada.png" group-title="🌟India - JioTV+",DD9 chandana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=713&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="901" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Udaya_HD.png" group-title="🌟India - JioTV+",Udaya HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=901&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="904" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanjha_TV.png" group-title="🌟India - JioTV+",Sanjha TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=904&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="951" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjab_Today.png" group-title="🌟India - JioTV+",Live Punjabi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=951&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="959" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/JUSPunjabi.png" group-title="🌟India - JioTV+",JUSPunjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=959&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="963" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Arre.png" group-title="🌟India - JioTV+",Arre HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=963&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="971" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vaanavil_TV.png" group-title="🌟India - JioTV+",Vaanavil TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=971&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="978" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST1_HD.png" group-title="🌟India - JioTV+",TEST1 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=978&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="979" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST2_HD.png" group-title="🌟India - JioTV+",TEST2 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=979&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1066" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TheQIndia.png" group-title="🌟India - JioTV+",The Q\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1066&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1144" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Namma_TV.png" group-title="🌟India - JioTV+",Namma TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1144&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1146" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Marathi_SD.png" group-title="🌟India - JioTV+",Sony Marathi SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1146&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1151" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rangamanch.png" group-title="🌟India - JioTV+",Rangamanch\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1151&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1157" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Comedy_Central_HD.png" group-title="🌟India - JioTV+",Comedy Central HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1157&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1158" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Infinity_HD.png" group-title="🌟India - JioTV+",Colors Infinity HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1158&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1171" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_Punjabi.png" group-title="🌟India - JioTV+",PTC Punjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1171&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1209" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kalaignar_TV.png" group-title="🌟India - JioTV+",Kalaignar TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1209&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1232" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hi_Dost.png" group-title="🌟India - JioTV+",Hi Dost!\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1232&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1279" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manoranjan_Grand.png" group-title="🌟India - JioTV+",Manoranjan Grand\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1279&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1299" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manjari_TV.png" group-title="🌟India - JioTV+",Manjari TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1299&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1319" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Cafe_HD.png" group-title="🌟India - JioTV+",Zee Cafe HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1319&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1325" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Infinity_SD.png" group-title="🌟India - JioTV+",Colors Infinity SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1325&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1327" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Comedy_Central_SD.png" group-title="🌟India - JioTV+",Comedy Central SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1327&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1328" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Arunprabha.png" group-title="🌟India - JioTV+",DD Arunprabha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1328&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1329" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Gyandarshan.png" group-title="🌟India - JioTV+",DD Gyandarshan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1329&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1351" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_TV.png" group-title="🌟India - JioTV+",Zee TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1351&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1356" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Tamil_HD.png" group-title="🌟India - JioTV+",Zee Tamil HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1356&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1359" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Big_Magic.png" group-title="🌟India - JioTV+",Big Magic\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1359&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1360" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Marathi_HD.png" group-title="🌟India - JioTV+",Zee Marathi HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1360&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1362" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Kannada_HD.png" group-title="🌟India - JioTV+",Zee Kannada HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1362&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1369" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Bangla_SD.png" group-title="🌟India - JioTV+",Colors Bangla SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1369&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1371" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Tamil.png" group-title="🌟India - JioTV+",Colors Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1371&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1393" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Wah.png" group-title="🌟India - JioTV+",Sony Wah\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1393&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1396" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_SD.png" group-title="🌟India - JioTV+",Set SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1396&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1514" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kannur_one.png" group-title="🌟India - JioTV+",Kannur One\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1514&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1518" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Moon_Tv.png" group-title="🌟India - JioTV+",Moon TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1518&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1603" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/HitsIndia_HD.png" group-title="🌟India - JioTV+",HITS HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1603&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1634" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sirikannada.png" group-title="🌟India - JioTV+",Siri Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1634&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1641" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Keralam_HD.png" group-title="🌟India - JioTV+",Zee Keralam HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1641&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1662" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Surya_Comedy.png" group-title="🌟India - JioTV+",Surya Comedy\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1662&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1669" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_Bangla.png" group-title="🌟India - JioTV+",Sun Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1669&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1730" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjab1_TV.png" group-title="🌟India - JioTV+",Luv Punjab TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1730&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1739" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/V24_TV.png" group-title="🌟India - JioTV+",JKAC News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1739&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1751" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Punjabi.png" group-title="🌟India - JioTV+",Zee Punjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1751&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1762" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Channel_Vision.png" group-title="🌟India - JioTV+",Channel Vision\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1762&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1798" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pasand.png" group-title="🌟India - JioTV+",Pasand\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1798&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1799" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Studio_Yuva_Alpha.png" group-title="🌟India - JioTV+",Studio Yuva Alpha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1799&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1834" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Green_Chillies_TV.png" group-title="🌟India - JioTV+",Green Chillies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1834&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1868" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjab_Plus.png" group-title="🌟India - JioTV+",Punjab Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1868&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1925" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MH1_DilSe.png" group-title="🌟India - JioTV+",MH1 Dil Se\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1925&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1956" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sidharth_TV.png" group-title="🌟India - JioTV+",Sidharth TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1956&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1961" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shemaroo_TV.png" group-title="🌟India - JioTV+",Shemaroo TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1961&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2001" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PlusTest2_HD.png" group-title="🌟India - JioTV+",PlusTest2 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2001&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2010" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ekamra_Nilach_akra.png" group-title="🌟India - JioTV+",Ekamra Nilach akra\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2010&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2024" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_TV.png" group-title="🌟India - JioTV+",And TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2024&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2040" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bollywood_Hungama.png" group-title="🌟India - JioTV+",Bollywood Hungama\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2040&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2077" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gangaur.png" group-title="🌟India - JioTV+",Gangaur\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2077&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2078" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shemaroo_Umang.png" group-title="🌟India - JioTV+",Shemaroo Umang\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2078&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2149" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Prime_HD.png" group-title="🌟India - JioTV+",Jio Prime HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2149&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2227" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jatra_Ekamra.png" group-title="🌟India - JioTV+",Jatra Ekamra\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2227&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2253" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nakshatra_Digital_TV.png" group-title="🌟India - JioTV+",Nakshatra Digital TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2253&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2258" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Animax.png" group-title="🌟India - JioTV+",Animax\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2258&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2354" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Friends_TV.png" group-title="🌟India - JioTV+",Friends TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2354&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2424" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_Marathi.png" group-title="🌟India - JioTV+",Sun Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2424&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2435" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Spondon.png" group-title="🌟India - JioTV+",Spondon\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2435&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2759" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_North_East.png" group-title="🌟India - JioTV+",DD North East\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2759&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2761" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Ganga.png" group-title="🌟India - JioTV+",Zee Ganga\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2761&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2817" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Boogle_Bangla.png" group-title="🌟India - JioTV+",Boogle Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2817&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2854" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KCM.png" group-title="🌟India - JioTV+",KCM\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2854&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2955" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shrimad_Ramayan.png" group-title="🌟India - JioTV+",Shrimad Ramayan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2955&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2962" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/No_Filter_Neha.png" group-title="🌟India - JioTV+",NoFilterNeha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2962&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3005" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rupashi_Bangla.png" group-title="🌟India - JioTV+",Rupashi Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3005&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3008" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Maya_Tv.png" group-title="🌟India - JioTV+",Maya Tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3008&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3010" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Miss_World.png" group-title="🌟India - JioTV+",Sony Miss World\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3010&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="173" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aaj_Tak.png" group-title="🌟India - JioTV+",Aaj Tak\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=173&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="672" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_Ananda.png" group-title="🌟India - JioTV+",ABP Ananda\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=672&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="235" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_TV.png" group-title="🌟India - JioTV+",India TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=235&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="231" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/IBN_7.png" group-title="🌟India - JioTV+",News 18 India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=231&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1251" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV9_Bharatvarsh.png" group-title="🌟India - JioTV+",TV9 Bharatvarsh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1251&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1403" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Republic_Bharat.png" group-title="🌟India - JioTV+",Republic Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1403&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="177" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_News_India.png" group-title="🌟India - JioTV+",ABP News India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=177&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="619" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV9_Karnataka.png" group-title="🌟India - JioTV+",TV9 Karnataka\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=619&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="636" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Polimer_News.png" group-title="🌟India - JioTV+",Polimer News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=636&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="778" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Public_TV.png" group-title="🌟India - JioTV+",Public TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=778&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="617" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV9_Maharashtra.png" group-title="🌟India - JioTV+",TV9 Maharashtra\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=617&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="618" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV9_Telugu_News.png" group-title="🌟India - JioTV+",TV9 Telugu News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=618&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="180" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Asianet_News.png" group-title="🌟India - JioTV+",Asianet News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=180&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="193" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNN.png" group-title="🌟India - JioTV+",CNN\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=193&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="203" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_News.png" group-title="🌟India - JioTV+",DD News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=203&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="232" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/IBN_Lokmat.png" group-title="🌟India - JioTV+",News18 Lokmat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=232&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="255" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NDTV_24x7.png" group-title="🌟India - JioTV+",NDTV 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=255&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="258" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NDTV_India.png" group-title="🌟India - JioTV+",NDTV India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=258&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="383" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Times_NOW.png" group-title="🌟India - JioTV+",Times NOW\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=383&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="412" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Wion.png" group-title="🌟India - JioTV+",Wion\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=412&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="418" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jaya_Plus.png" group-title="🌟India - JioTV+",Jaya Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=418&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="421" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Goa365.png" group-title="🌟India - JioTV+",GOA 365\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=421&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="442" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_24_Taas.png" group-title="🌟India - JioTV+",Zee 24 Taas\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=442&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="464" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/24_Ghanta_TV.png" group-title="🌟India - JioTV+",24 Ghanta TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=464&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="465" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jaihind_tv.png" group-title="🌟India - JioTV+",Jaihind tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=465&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="491" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mirror_Now.png" group-title="🌟India - JioTV+",Mirror Now\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=491&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="492" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNN_NEWS_18.png" group-title="🌟India - JioTV+",CNN NEWS 18\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=492&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="493" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_Today.png" group-title="🌟India - JioTV+",India Today\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=493&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="494" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AL_Jazeera.png" group-title="🌟India - JioTV+",AL Jazeera\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=494&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="495" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_X.png" group-title="🌟India - JioTV+",News X\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=495&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="496" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/dw.png" group-title="🌟India - JioTV+",dw\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=496&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="498" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_news.png" group-title="🌟India - JioTV+",India news\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=498&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="499" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Nation.png" group-title="🌟India - JioTV+",News Nation\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=499&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="501" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_24.png" group-title="🌟India - JioTV+",News 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=501&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="502" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tez.png" group-title="🌟India - JioTV+",Good News Today\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=502&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="503" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/IBC-24.png" group-title="🌟India - JioTV+",IBC24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=503&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="504" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_News.png" group-title="🌟India - JioTV+",Zee News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=504&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="506" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sahara_Samay_Rastriya.png" group-title="🌟India - JioTV+",Sahara Samay Rastriya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=506&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="507" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SAHARA_SAMAY_MP.png" group-title="🌟India - JioTV+",SAHARA SAMAY MP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=507&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="508" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SAHARA_SAMAY_UP.png" group-title="🌟India - JioTV+",SAHARA SAMAY UP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=508&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="509" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sahara_Samay_Bihar.png" group-title="🌟India - JioTV+",Sahara Samay Bihar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=509&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="511" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mh_One_News.png" group-title="🌟India - JioTV+",Mh One News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=511&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="512" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_UP.png" group-title="🌟India - JioTV+",India News UP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=512&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="513" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_Rajasthan.png" group-title="🌟India - JioTV+",India News Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=513&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="515" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_MP.png" group-title="🌟India - JioTV+",India News MP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=515&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="516" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_Haryana.png" group-title="🌟India - JioTV+",India News Haryana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=516&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="517" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Chardikla_Time_TV.png" group-title="🌟India - JioTV+",Chardikla Time TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=517&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="518" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sudarshan.png" group-title="🌟India - JioTV+",Sudarshan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=518&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="519" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhna_News_Plus.png" group-title="🌟India - JioTV+",Sadhna News Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=519&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="520" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Rajyasabha.png" group-title="🌟India - JioTV+",Sansad TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=520&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="522" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Loksabha_TV.png" group-title="🌟India - JioTV+",Sansad TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=522&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="529" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_MP.png" group-title="🌟India - JioTV+",News18 MP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=529&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="530" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_UP.png" group-title="🌟India - JioTV+",News18 UP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=530&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="531" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_RAJASTHAN.png" group-title="🌟India - JioTV+",News18 RAJASTHAN\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=531&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="572" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Living_Foodz.png" group-title="🌟India - JioTV+",Zee UP UK\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=572&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="612" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_Majha.png" group-title="🌟India - JioTV+",ABP Majha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=612&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="613" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Newslive.png" group-title="🌟India - JioTV+",Newslive\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=613&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="615" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_18_Tamilnadu.png" group-title="🌟India - JioTV+",News 18 Tamilnadu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=615&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="616" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tv_9_Gujarat.png" group-title="🌟India - JioTV+",Tv 9 Gujarat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=616&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="620" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_News_Gujarati.png" group-title="🌟India - JioTV+",News18 Gujarati\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=620&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="624" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prag_News.png" group-title="🌟India - JioTV+",Prag News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=624&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="626" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Suvarna_News.png" group-title="🌟India - JioTV+",Suvarna News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=626&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="627" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_18_Assam.png" group-title="🌟India - JioTV+",News 18 Assam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=627&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="631" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MBC.png" group-title="🌟India - JioTV+",MBC\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=631&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="633" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DY_365.png" group-title="🌟India - JioTV+",DY 365\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=633&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="637" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/North_East_Live.png" group-title="🌟India - JioTV+",North East Live\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=637&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="641" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_Asmita.png" group-title="🌟India - JioTV+",ABP Asmita\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=641&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="642" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VTV_Gujarati.png" group-title="🌟India - JioTV+",VTV Gujarati\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=642&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="643" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/GS_TV.png" group-title="🌟India - JioTV+",GS TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=643&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="647" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pratidin_News.png" group-title="🌟India - JioTV+",Pratidin Time\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=647&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="650" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_News_Malayalam.png" group-title="🌟India - JioTV+",Raj News Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=650&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="651" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_News_Kannada.png" group-title="🌟India - JioTV+",Raj News Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=651&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="652" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_SANGAM.png" group-title="🌟India - JioTV+",Zee Hindustan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=652&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="653" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Kannada_News.png" group-title="🌟India - JioTV+",News18 Kannada News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=653&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="654" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Punjabi_HP_Haryana.png" group-title="🌟India - JioTV+",Zee Punjabi HP Haryana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=654&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="655" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Haryana_and_HP_News.png" group-title="🌟India - JioTV+",News18 Punjab Haryana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=655&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="656" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News9.png" group-title="🌟India - JioTV+",News 9\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=656&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="658" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_News_MP_Chattisgarh.png" group-title="🌟India - JioTV+",Zee News MP Chattisgarh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=658&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="659" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Rajasthan.png" group-title="🌟India - JioTV+",Zee Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=659&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="661" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Purvaiya.png" group-title="🌟India - JioTV+",Zee Bihar Jharkhand\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=661&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="662" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manorama_News.png" group-title="🌟India - JioTV+",Manorama News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=662&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="673" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News7_Tamil.png" group-title="🌟India - JioTV+",News7 Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=673&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="675" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Assam_Talks.png" group-title="🌟India - JioTV+",Assam Talks\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=675&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="676" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_News.png" group-title="🌟India - JioTV+",Sun News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=676&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="677" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Puthiya_Thalimurai.png" group-title="🌟India - JioTV+",Puthiya Thalimurai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=677&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="687" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Time_TV.png" group-title="🌟India - JioTV+",News Time TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=687&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="693" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_BIHAR.png" group-title="🌟India - JioTV+",News18 BIHAR\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=693&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="694" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Urdu.png" group-title="🌟India - JioTV+",News18 JKLH\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=694&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="696" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_News_Oriya.png" group-title="🌟India - JioTV+",News18 Oriya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=696&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="717" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ETV_Bangla_News.png" group-title="🌟India - JioTV+",News18 Bangla News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=717&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="718" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kanak_TV.png" group-title="🌟India - JioTV+",Kanak News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=718&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="724" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Kalinga.png" group-title="🌟India - JioTV+",Zee Delhi NCR Haryana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=724&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="725" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kairali_People_TV.png" group-title="🌟India - JioTV+",Kairali News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=725&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="728" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Salaam.png" group-title="🌟India - JioTV+",Zee Salaam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=728&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="764" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Channel_News_Asia_International.png" group-title="🌟India - JioTV+",Channel News Asia International\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=764&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="767" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_News_24x7.png" group-title="🌟India - JioTV+",Raj News&#160;24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=767&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="768" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jan_TV.png" group-title="🌟India - JioTV+",Jan TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=768&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="770" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kashish_News.png" group-title="🌟India - JioTV+",Kashish News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=770&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="771" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Live_Today.png" group-title="🌟India - JioTV+",Live Today\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=771&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="779" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prameya_News_7.png" group-title="🌟India - JioTV+",Prameya News 7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=779&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="780" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mathrubhumi_News.png" group-title="🌟India - JioTV+",Mathrubhumi News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=780&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="781" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kalinga_TV.png" group-title="🌟India - JioTV+",Kalinga TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=781&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="782" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sandesh_News.png" group-title="🌟India - JioTV+",Sandesh News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=782&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="783" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/K_News_India.png" group-title="🌟India - JioTV+",K News India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=783&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="787" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CVR_English.png" group-title="🌟India - JioTV+",CVR English\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=787&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="788" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_Voice.png" group-title="🌟India - JioTV+",India Voice\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=788&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="789" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/JK_24x7_News.png" group-title="🌟India - JioTV+",JK 24x7 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=789&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="791" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Taaza_TV.png" group-title="🌟India - JioTV+",Taaza TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=791&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="792" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_State_UK_UP.png" group-title="🌟India - JioTV+",News State UK UP\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=792&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="793" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sahara_Samay_Rajasthan.png" group-title="🌟India - JioTV+",Sahara Samay Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=793&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="799" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Naxatra_News.png" group-title="🌟India - JioTV+",Naxatra News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=799&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="804" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samachar_Plus.png" group-title="🌟India - JioTV+",Samachar Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=804&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="807" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gulistan_News.png" group-title="🌟India - JioTV+",Gulistan News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=807&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="808" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hindi_Khabar.png" group-title="🌟India - JioTV+",Hindi Khabar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=808&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="810" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Janam_TV.png" group-title="🌟India - JioTV+",Janam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=810&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="826" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Malai_Murasu.png" group-title="🌟India - JioTV+",Malai Murasu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=826&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="830" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Thanthi_TV.png" group-title="🌟India - JioTV+",Thanthi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=830&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="831" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Living_India_News.png" group-title="🌟India - JioTV+",Living India News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=831&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="837" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Euro_News.png" group-title="🌟India - JioTV+",Euro News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=837&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="838" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/France_24.png" group-title="🌟India - JioTV+",France 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=838&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="842" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jeevan_TV.png" group-title="🌟India - JioTV+",Jeevan TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=842&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="843" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Madhimugam_TV.png" group-title="🌟India - JioTV+",Madhimugam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=843&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="846" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MK_News.png" group-title="🌟India - JioTV+",MKN\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=846&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="850" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_India_24_X_7.png" group-title="🌟India - JioTV+",News India 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=850&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="851" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SMBC_TV.png" group-title="🌟India - JioTV+",SMBC TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=851&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="855" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Total_TV.png" group-title="🌟India - JioTV+",Total TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=855&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="858" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Republic_TV.png" group-title="🌟India - JioTV+",Republic TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=858&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="876" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Times_Now_HD.png" group-title="🌟India - JioTV+",Times Now World\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=876&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="880" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Janta_TV.png" group-title="🌟India - JioTV+",Janta TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=880&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="882" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News11.png" group-title="🌟India - JioTV+",News11\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=882&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="885" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV_5_Monde.png" group-title="🌟India - JioTV+",TV5 Monde\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=885&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="907" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/GoodNews_Channel.png" group-title="🌟India - JioTV+",GoodNews Channel\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=907&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="910" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Media_One_TV.png" group-title="🌟India - JioTV+",Media One TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=910&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="915" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Khabar_Fast.png" group-title="🌟India - JioTV+",Khabar Fast\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=915&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="916" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV_100.png" group-title="🌟India - JioTV+",TV 100\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=916&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="917" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/APN_News.png" group-title="🌟India - JioTV+",APN News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=917&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="918" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bharat_Samachar.png" group-title="🌟India - JioTV+",Bharat Samachar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=918&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="921" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prime_News.png" group-title="🌟India - JioTV+",Prime News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=921&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="923" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/R.Kannada.png" group-title="🌟India - JioTV+",R.Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=923&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="926" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/A1_TV_Rajasthan.png" group-title="🌟India - JioTV+",A1 TV Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=926&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="927" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/First_India_News.png" group-title="🌟India - JioTV+",First India News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=927&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="929" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_24_Kalak.png" group-title="🌟India - JioTV+",Zee 24 Kalak\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=929&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="933" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/4_TV.png" group-title="🌟India - JioTV+",4 TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=933&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="936" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_1_India.png" group-title="🌟India - JioTV+",News 1 India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=936&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="938" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/BTV.png" group-title="🌟India - JioTV+",BTV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=938&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="944" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mantavya_News.png" group-title="🌟India - JioTV+",Mantavya News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=944&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="950" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RPLUS.png" group-title="🌟India - JioTV+",R Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=950&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="954" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prajaa_TV.png" group-title="🌟India - JioTV+",Prajaa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=954&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="956" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV_5_Kannada.png" group-title="🌟India - JioTV+",TV 5 Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=956&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="957" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/INH_24x7.png" group-title="🌟India - JioTV+",INH 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=957&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="958" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DNN.png" group-title="🌟India - JioTV+",DNN\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=958&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="960" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/JUS24x7.png" group-title="🌟India - JioTV+",JUS 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=960&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="965" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_18_Kerala.png" group-title="🌟India - JioTV+",News 18 Kerala\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=965&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="966" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PrudentHD.png" group-title="🌟India - JioTV+",Prudent\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=966&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="970" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Win_TV.png" group-title="🌟India - JioTV+",Win TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=970&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="975" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jantantra.png" group-title="🌟India - JioTV+",Jantantra\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=975&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1059" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST3_HD.png" group-title="🌟India - JioTV+",TEST3 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1059&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1102" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RDX_News.png" group-title="🌟India - JioTV+",RDX Goa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1102&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1170" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_News.png" group-title="🌟India - JioTV+",PTC News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1170&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1179" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bansal_News.png" group-title="🌟India - JioTV+",Bansal News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1179&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1185" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swadesh_News.png" group-title="🌟India - JioTV+",Swadesh News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1185&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1205" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_Ganga.png" group-title="🌟India - JioTV+",ABP Ganga\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1205&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1210" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kalaignar_Seithigal_.png" group-title="🌟India - JioTV+",Kalaignar Seithigal\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1210&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1240" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST10_HD.png" group-title="🌟India - JioTV+",TEST10 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1240&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1246" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tripura_News.png" group-title="🌟India - JioTV+",Headlines Tripura\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1246&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1250" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TWENTY_FOUR_NEWS.png" group-title="🌟India - JioTV+",Twenty Four News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1250&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1257" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Surya_Samachar.png" group-title="🌟India - JioTV+",Surya Samachar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1257&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1260" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CTVN_AKD_Plus.png" group-title="🌟India - JioTV+",Ctvn Akd Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1260&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1261" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Calcutta_News.png" group-title="🌟India - JioTV+",Calcutta News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1261&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1263" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Total_Tv_Haryana.png" group-title="🌟India - JioTV+",Total Tv Haryana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1263&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1264" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kolkata_TV.png" group-title="🌟India - JioTV+",Kolkata TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1264&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1287" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ANBNews.png" group-title="🌟India - JioTV+",ANB News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1287&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1291" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABP_Sanjha.png" group-title="🌟India - JioTV+",ABP Sanjha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1291&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1293" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Lokshahi_News.png" group-title="🌟India - JioTV+",Lokshahi News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1293&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1338" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RT_TV.png" group-title="🌟India - JioTV+",RT TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1338&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1394" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jai_Maharashtra.png" group-title="🌟India - JioTV+",Jai Maharashtra\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1394&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1405" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NHK_World_Japan.png" group-title="🌟India - JioTV+",NHK World Japan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1405&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1408" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Reporter_TV.png" group-title="🌟India - JioTV+",Reporter TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1408&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1427" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nandighosha.png" group-title="🌟India - JioTV+",Nandighosha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1427&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1432" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TIME8.png" group-title="🌟India - JioTV+",TIME8\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1432&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1451" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/9_Bharat_Samachar.png" group-title="🌟India - JioTV+",9 Bharat Samachar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1451&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1457" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Only.png" group-title="🌟India - JioTV+",News Only\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1457&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1481" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Argus_TV.png" group-title="🌟India - JioTV+",Argus News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1481&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1494" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhoomi_TV.png" group-title="🌟India - JioTV+",BHOOMI 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1494&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1515" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_J.png" group-title="🌟India - JioTV+",News J\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1515&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1525" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST13_HD.png" group-title="🌟India - JioTV+",TEST13 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1525&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1528" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Network_10.png" group-title="🌟India - JioTV+",Network 10\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1528&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1550" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AB_News.png" group-title="🌟India - JioTV+",AB News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1550&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1551" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/P_News.png" group-title="🌟India - JioTV+",P News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1551&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1553" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABSTAR_News.png" group-title="🌟India - JioTV+",AB Star News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1553&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1555" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_First.png" group-title="🌟India - JioTV+",News First\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1555&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1592" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Lokmanch_News.png" group-title="🌟India - JioTV+",Lokmanch News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1592&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1594" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samachar_24.png" group-title="🌟India - JioTV+",Samachar 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1594&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1608" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MP_News.png" group-title="🌟India - JioTV+",MP News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1608&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1610" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Divyang_News.png" group-title="🌟India - JioTV+",Divyang News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1610&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1612" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tara_TV.png" group-title="🌟India - JioTV+",Tara TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1612&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1618" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Real_News_Kerala.png" group-title="🌟India - JioTV+",Real News Kerala\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1618&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1635" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_State_MPCG.png" group-title="🌟India - JioTV+",News State MPCG\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1635&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1658" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aalami_Samay.png" group-title="🌟India - JioTV+",Aalami Samay\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1658&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1670" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/C_News_Bharat.png" group-title="🌟India - JioTV+",C News Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1670&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1692" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Badakhabar.png" group-title="🌟India - JioTV+",Badakhabar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1692&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1695" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prime_TV.png" group-title="🌟India - JioTV+",Prime TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1695&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1697" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/FM_News.png" group-title="🌟India - JioTV+",FM News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1697&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1698" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/IND_24.png" group-title="🌟India - JioTV+",IND 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1698&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1699" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ANN_News.png" group-title="🌟India - JioTV+",ANN News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1699&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1725" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/24hrs_TV.png" group-title="🌟India - JioTV+",24Hrs TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1725&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1728" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Anaadi_TV.png" group-title="🌟India - JioTV+",Anaadi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1728&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1729" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Live_7.png" group-title="🌟India - JioTV+",Live 7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1729&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1731" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/N5TV.png" group-title="🌟India - JioTV+",N5TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1731&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1733" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ND24.png" group-title="🌟India - JioTV+",ND 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1733&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1735" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV9_Bangla.png" group-title="🌟India - JioTV+",TV9 Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1735&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1743" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hornbill_TV.png" group-title="🌟India - JioTV+",Hornbill TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1743&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1747" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_Gujarat.png" group-title="🌟India - JioTV+",India News Gujarat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1747&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1757" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NK_TV.png" group-title="🌟India - JioTV+",NK TV Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1757&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1758" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DPK_News.png" group-title="🌟India - JioTV+",DPK News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1758&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1759" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Buletin_India.png" group-title="🌟India - JioTV+",Buletin India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1759&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1761" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aryan_TV_National.png" group-title="🌟India - JioTV+",Aryan TV National\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1761&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1771" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Express_News.png" group-title="🌟India - JioTV+",Express News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1771&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1777" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bharat_News.png" group-title="🌟India - JioTV+",Bharat News TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1777&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1790" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VRLive.png" group-title="🌟India - JioTV+",VR Live\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1790&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1791" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KPNews.png" group-title="🌟India - JioTV+",KP News 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1791&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1793" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/National_News_Sattaxpress.png" group-title="🌟India - JioTV+",National News Sattaxpress\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1793&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1796" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Anand_Barta.png" group-title="🌟India - JioTV+",Ananda Barta\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1796&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1802" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_World_India.png" group-title="🌟India - JioTV+",News World India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1802&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1804" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jan_Setu_TV.png" group-title="🌟India - JioTV+",Jan Setu News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1804&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1816" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DTV_Bharat.png" group-title="🌟India - JioTV+",DTV Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1816&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1817" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NEWS_24_MPCG.png" group-title="🌟India - JioTV+",NEWS 24 MPCG\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1817&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1853" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News11_Bharat.png" group-title="🌟India - JioTV+",News11 Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1853&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1854" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/STV_Haryana_News.png" group-title="🌟India - JioTV+",STV Haryana News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1854&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1855" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NL_TV.png" group-title="🌟India - JioTV+",NL TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1855&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1856" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Time_Assam.png" group-title="🌟India - JioTV+",Pratham Khabar 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1856&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1886" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sansad_TV_RajyaSabha.png" group-title="🌟India - JioTV+",Sansad TV Rajya Sabha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1886&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1891" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tribe_TV.png" group-title="🌟India - JioTV+",Tribe TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1891&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1895" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Today_24_News.png" group-title="🌟India - JioTV+",Today 24 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1895&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1896" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Flash.png" group-title="🌟India - JioTV+",News Flash\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1896&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1897" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pulse_24.png" group-title="🌟India - JioTV+",Pulse 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1897&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1898" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/GBN24.png" group-title="🌟India - JioTV+",GBN24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1898&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1900" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ENB.png" group-title="🌟India - JioTV+",Express News Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1900&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1906" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Times_Now_Navbharat.png" group-title="🌟India - JioTV+",Times Now Navbharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1906&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1954" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_Tamil_24x7.png" group-title="🌟India - JioTV+",News Tamil 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1954&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1959" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Global_India.png" group-title="🌟India - JioTV+",Global India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1959&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1962" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Amaar_Bangla.png" group-title="🌟India - JioTV+",Amaar Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1962&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1963" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KVP_Bhaarat.png" group-title="🌟India - JioTV+",News 24 Express\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1963&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1964" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABC_News.png" group-title="🌟India - JioTV+",ABC News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1964&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1965" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VNM_News.png" group-title="🌟India - JioTV+",VNM TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1965&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1966" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Live_TV_Kerala.png" group-title="🌟India - JioTV+",Live TV Kerala\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1966&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1972" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Top_News_Marathi.png" group-title="🌟India - JioTV+",Top News Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1972&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1974" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gujarat_First_24x7.png" group-title="🌟India - JioTV+",Gujarat 1st 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1974&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1999" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raftaar_Media.png" group-title="🌟India - JioTV+",Raftaar Media\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1999&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2004" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shekinah.png" group-title="🌟India - JioTV+",Shekinah TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2004&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2005" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Virat_24.png" group-title="🌟India - JioTV+",IN 24 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2005&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2007" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/BS9_News.png" group-title="🌟India - JioTV+",BS9 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2007&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2008" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News_21.png" group-title="🌟India - JioTV+",News 21\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2008&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2013" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ekamra_S_News.png" group-title="🌟India - JioTV+",Leaking Top Secret\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2013&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2014" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rajpath_TV.png" group-title="🌟India - JioTV+",News India TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2014&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2017" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Munsif_TV.png" group-title="🌟India - JioTV+",Munsif TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2017&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2018" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samachar_Nation.png" group-title="🌟India - JioTV+",Samachar Nation\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2018&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2019" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Global_Punjab.png" group-title="🌟India - JioTV+",Global Punjab\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2019&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2020" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KKD_News.png" group-title="🌟India - JioTV+",KKD News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2020&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2021" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/HNN24x7.png" group-title="🌟India - JioTV+",HNN 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2021&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2022" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NB_News.png" group-title="🌟India - JioTV+",NB News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2022&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2027" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raatdin_News_Network.png" group-title="🌟India - JioTV+",Raatdin News Network\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2027&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2030" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aaryaa_News.png" group-title="🌟India - JioTV+",Aaryaa News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2030&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2074" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prime_Media.png" group-title="🌟India - JioTV+",Prime Media Goa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2074&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2079" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bharat_24.png" group-title="🌟India - JioTV+",Bharat 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2079&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2081" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV27_News.png" group-title="🌟India - JioTV+",TV27 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2081&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2082" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/22Scope_News.png" group-title="🌟India - JioTV+",22Scope News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2082&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2176" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India24x7.png" group-title="🌟India - JioTV+",India 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2176&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2187" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swatantra_News.png" group-title="🌟India - JioTV+",Swatantra News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2187&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2188" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Globe_TV.png" group-title="🌟India - JioTV+",Globe TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2188&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2224" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_News_Punjab.png" group-title="🌟India - JioTV+",India News Punjab\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2224&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2225" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV24.png" group-title="🌟India - JioTV+",TV24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2225&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2228" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samay_Kolkata.png" group-title="🌟India - JioTV+",Samay Kolkata\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2228&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2233" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/News80.png" group-title="🌟India - JioTV+",News 80\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2233&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2254" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Media9.png" group-title="🌟India - JioTV+",Media9\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2254&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2255" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RRN_News.png" group-title="🌟India - JioTV+",RRN News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2255&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2323" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TTN24.png" group-title="🌟India - JioTV+",TTN24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2323&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2326" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Firstpost.png" group-title="🌟India - JioTV+",Firstpost\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2326&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2353" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bharat_Express.png" group-title="🌟India - JioTV+",Bharat Express\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2353&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2355" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/One_Paschima.png" group-title="🌟India - JioTV+",One Paschima\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2355&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2423" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Bharat.png" group-title="🌟India - JioTV+",Vande Bharat News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2423&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2433" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/E_News79.png" group-title="🌟India - JioTV+",E News 79\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2433&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2434" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/M_Nadu.png" group-title="🌟India - JioTV+",M Nadu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2434&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2436" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prime_9_News.png" group-title="🌟India - JioTV+",Prime 9 News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2436&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2732" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vistara_News.png" group-title="🌟India - JioTV+",Vistara News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2732&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2734" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Popular_TV.png" group-title="🌟India - JioTV+",Popular TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2734&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2735" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samachar_Plus_Jh_Bihar.png" group-title="🌟India - JioTV+",Samachar Plus Jharkhand Bihar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2735&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2742" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Kannada_News.png" group-title="🌟India - JioTV+",Zee Kannada News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2742&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2743" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Power_TV.png" group-title="🌟India - JioTV+",Power TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2743&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2760" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/My_Bharat_News.png" group-title="🌟India - JioTV+",My Bharat News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2760&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2763" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NewsState_Maha_Goa.png" group-title="🌟India - JioTV+",News State Maharashtra Goa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2763&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2764" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NewsState_Bihar_JH.png" group-title="🌟India - JioTV+",News State Bihar Jharkhand\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2764&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2765" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/BSTV.png" group-title="🌟India - JioTV+",BSTV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2765&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2767" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sacchi_Report.png" group-title="🌟India - JioTV+",Sacchi Report\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2767&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2770" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Har_Khabar.png" group-title="🌟India - JioTV+",Har Khabar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2770&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2771" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhna_News_MP_CG.png" group-title="🌟India - JioTV+",Sadhna News MP CG\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2771&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2772" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_Daily_Live.png" group-title="🌟India - JioTV+",India Daily Live\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2772&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2773" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aaj_Ki_Khabar.png" group-title="🌟India - JioTV+",Aaj Ki Khabar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2773&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2777" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Asian_News.png" group-title="🌟India - JioTV+",Asian News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2777&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2780" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/R_Bangla.png" group-title="🌟India - JioTV+",R Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2780&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2782" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ABC_Australia.png" group-title="🌟India - JioTV+",ABC Australia\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2782&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2783" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Big_TV.png" group-title="🌟India - JioTV+",Big TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2783&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2827" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Headline_News.png" group-title="🌟India - JioTV+",Headline News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2827&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2851" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/IN24_Live.png" group-title="🌟India - JioTV+",IN24 Live\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2851&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2862" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mahaa_News.png" group-title="🌟India - JioTV+",Mahaa News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2862&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2914" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/BHI_Channel.png" group-title="🌟India - JioTV+",BHI Channel\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2914&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2915" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Praveg_TV.png" group-title="🌟India - JioTV+",Praveg TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2915&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2916" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Daily_Post_PHH.png" group-title="🌟India - JioTV+",Daily Post PHH\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2916&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2918" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/WPN_World_Punjabi_News.png" group-title="🌟India - JioTV+",WPN World Punjabi News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2918&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2933" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NKTV_Bangla.png" group-title="🌟India - JioTV+",NK TV Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2933&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2935" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pudhari_News.png" group-title="🌟India - JioTV+",Pudhari News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2935&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2937" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Update_India.png" group-title="🌟India - JioTV+",Update India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2937&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2945" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tar_TV.png" group-title="🌟India - JioTV+",Tar TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2945&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2946" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/National_News.png" group-title="🌟India - JioTV+",National News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2946&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2953" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Enrich_TV.png" group-title="🌟India - JioTV+",Enrich TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2953&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2954" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV45.png" group-title="🌟India - JioTV+",TV45\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2954&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2957" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Public_First.png" group-title="🌟India - JioTV+",Public First\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2957&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2958" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tamilan_Television.png" group-title="🌟India - JioTV+",Tamilan Television\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2958&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2959" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Janta_Darbar_News.png" group-title="🌟India - JioTV+",Janta Darbar News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2959&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2961" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Current_Trend_Assam.png" group-title="🌟India - JioTV+",Current Trend Assam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2961&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3004" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Velicham_Tv.png" group-title="🌟India - JioTV+",Velicham Tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3004&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3007" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AMV.png" group-title="🌟India - JioTV+",AMV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3007&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3009" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_Now.png" group-title="🌟India - JioTV+",India Now\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3009&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="891" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten2_HD.png" group-title="🌟India - JioTV+",Sony Ten 2 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=891&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2852" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sports18_2.png" group-title="🌟India - JioTV+",Sports18 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2852&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="162" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_HD.png" group-title="🌟India - JioTV+",Sony Ten 1 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=162&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1984" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sports18_1_HD.png" group-title="🌟India - JioTV+",Sports18 1 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1984&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="155" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Six_HD.png" group-title="🌟India - JioTV+",Sony Ten 5 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=155&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="892" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten3_HD.png" group-title="🌟India - JioTV+",Sony Ten 3 HD Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=892&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="204" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Sports.png" group-title="🌟India - JioTV+",DD Sports\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=204&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="514" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_1.png" group-title="🌟India - JioTV+",Sony Ten 1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=514&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="523" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_2.png" group-title="🌟India - JioTV+",Ten 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=523&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="524" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_3.png" group-title="🌟India - JioTV+",Sony Ten 3 Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=524&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="525" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Six_SD.png" group-title="🌟India - JioTV+",Sony Ten 5\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=525&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="875" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dsports_HD.png" group-title="🌟India - JioTV+",Eurosport HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=875&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1061" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST5_HD.png" group-title="🌟India - JioTV+",TEST5 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1061&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1163" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Esports_HD.png" group-title="🌟India - JioTV+",JioGames HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1163&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1294" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dsports.png" group-title="🌟India - JioTV+",Eurosport\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1294&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1529" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MI_TV.png" group-title="🌟India - JioTV+",MI TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1529&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1675" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ESG.png" group-title="🌟India - JioTV+",ESG TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1675&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1772" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_4_HD_Tamil.png" group-title="🌟India - JioTV+",Sony Ten 4 HD Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1772&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1774" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten_4_Tamil.png" group-title="🌟India - JioTV+",Sony Ten 4 Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1774&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1918" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Cricket_English.png" group-title="🌟India - JioTV+",Jio Cricket English HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1918&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1985" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sports18_1_SD.png" group-title="🌟India - JioTV+",Sports18 1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1985&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1998" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sports18_Khel.png" group-title="🌟India - JioTV+",Sports18 Khel\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1998&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2183" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Q_GameX.png" group-title="🌟India - JioTV+",Q GameX\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2183&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2766" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Brave_TV.png" group-title="🌟India - JioTV+",BRAVE TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2766&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2779" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Red_Bull_TV.png" group-title="🌟India - JioTV+",Red Bull TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2779&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2853" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sports18_3.png" group-title="🌟India - JioTV+",Sports18 3\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2853&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2960" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ten1_HD_Malayalam.png" group-title="🌟India - JioTV+",Sony Ten 1 HD Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2960&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="165" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Cinema_HD.png" group-title="🌟India - JioTV+",Zee Cinema HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=165&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1477" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Color_Cineplex_HD.png" group-title="🌟India - JioTV+",Colors Cineplex HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1477&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="482" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Cineplex.png" group-title="🌟India - JioTV+",Colors Cineplex\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=482&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="182" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/B4U_Movies.png" group-title="🌟India - JioTV+",B4U Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=182&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="894" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KTV_HD.png" group-title="🌟India - JioTV+",KTV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=894&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="153" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Talkies.png" group-title="🌟India - JioTV+",Zee Talkies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=153&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="185" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_Pictures_HD.png" group-title="🌟India - JioTV+",And Pictures HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=185&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="289" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Max_SD.png" group-title="🌟India - JioTV+",Sony Max SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=289&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="415" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Anmol_Cinema.png" group-title="🌟India - JioTV+",Zee Anmol Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=415&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="417" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/J_Movies.png" group-title="🌟India - JioTV+",J Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=417&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="476" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Max_HD.png" group-title="🌟India - JioTV+",Sony Max HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=476&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="483" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_MAX2.png" group-title="🌟India - JioTV+",Sony MAX2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=483&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="484" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Cinema.png" group-title="🌟India - JioTV+",Zee Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=484&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="486" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhojpuri_Cinema.png" group-title="🌟India - JioTV+",Bhojpuri Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=486&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="487" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Classic.png" group-title="🌟India - JioTV+",Zee Bollywood\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=487&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="488" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Action.png" group-title="🌟India - JioTV+",Zee Action\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=488&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="678" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Udaya_Movies.png" group-title="🌟India - JioTV+",Udaya Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=678&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="682" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_Life.png" group-title="🌟India - JioTV+",Sun Life\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=682&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="683" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Digital_Plus.png" group-title="🌟India - JioTV+",Raj Digital Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=683&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="685" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Bangla_Cinema.png" group-title="🌟India - JioTV+",Zee Bangla Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=685&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="738" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Fakt_Marathi.png" group-title="🌟India - JioTV+",Fakt Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=738&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="809" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Maha_Movies.png" group-title="🌟India - JioTV+",Maha Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=809&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="883" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Osar_Movies.png" group-title="🌟India - JioTV+",Oscar Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=883&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="908" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Indradhanu.png" group-title="🌟India - JioTV+",Indradhanu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=908&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="946" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pitaara.png" group-title="🌟India - JioTV+",Pitaara\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=946&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1190" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_Punjabi_Gold.png" group-title="🌟India - JioTV+",PTC Punjabi Gold\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1190&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1280" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manoranjan_TV.png" group-title="🌟India - JioTV+",Manoranjan TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1280&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1281" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manoranjan_Movies.png" group-title="🌟India - JioTV+",Manoranjan Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1281&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1282" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Khusboo_TV.png" group-title="🌟India - JioTV+",Khushboo TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1282&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1295" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/B4U_Kadak.png" group-title="🌟India - JioTV+",B4U Kadak\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1295&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1296" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/B4U_Bhojpuri.png" group-title="🌟India - JioTV+",B4U Bhojpuri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1296&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1322" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_Flix_HD.png" group-title="🌟India - JioTV+",&Flix HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1322&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1324" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Gujarati_Cinema.png" group-title="🌟India - JioTV+",Colors Gujarati Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1324&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1349" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_Prive_HD.png" group-title="🌟India - JioTV+",And Prive HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1349&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1358" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Talkies_HD.png" group-title="🌟India - JioTV+",Zee Talkies HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1358&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1450" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rishtey_Cineplex.png" group-title="🌟India - JioTV+",Colors Cineplex Superhit\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1450&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1452" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shemaroo_MarathiBana.png" group-title="🌟India - JioTV+",Shemaroo MarathiBana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1452&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1632" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Kannada_Cinema.png" group-title="🌟India - JioTV+",Colors Kannada Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1632&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1633" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Public_Movies.png" group-title="🌟India - JioTV+",Public Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1633&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1657" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Bangla_Cinema.png" group-title="🌟India - JioTV+",Colors Bangla Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1657&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1691" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Classic_SD.png" group-title="🌟India - JioTV+",Zee Classic\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1691&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1746" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Picchar_HD.png" group-title="🌟India - JioTV+",Zee Picchar HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1746&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1754" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Surya_Movies.png" group-title="🌟India - JioTV+",Surya Movies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1754&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1763" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Cineplex_Bollywood.png" group-title="🌟India - JioTV+",Colors Cineplex Bollywood\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1763&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1839" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_Pictures.png" group-title="🌟India - JioTV+",And Pictures\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1839&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1957" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sidharth_Gold.png" group-title="🌟India - JioTV+",Sidharth Gold\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1957&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2016" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ekamra_Cinema.png" group-title="🌟India - JioTV+",Ekamra Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2016&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2189" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aaryaa_Cinema.png" group-title="🌟India - JioTV+",Aaryaa Cinema\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2189&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2256" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Thirai.png" group-title="🌟India - JioTV+",Zee Thirai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2256&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2756" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Star_Entertainment.png" group-title="🌟India - JioTV+",Star Entertainment\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2756&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2758" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Chitramandir.png" group-title="🌟India - JioTV+",Zee Chitramandir\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2758&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2762" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NH_Studioz.png" group-title="🌟India - JioTV+",NH Studioz\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2762&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2776" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dhamaka_Movies_B4U.png" group-title="🌟India - JioTV+",Dhamaka Movies B4U\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2776&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2778" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tabbar_Hits.png" group-title="🌟India - JioTV+",Tabbar Hits\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2778&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="575" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Channel_Hindi.png" group-title="🌟India - JioTV+",Discovery Channel Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=575&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="146" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/History_HD.png" group-title="🌟India - JioTV+",History TV18 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=146&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="242" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Channel_English.png" group-title="🌟India - JioTV+",Discovery\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=242&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="286" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Animal_Planet_HD.png" group-title="🌟India - JioTV+",Animal Planet HD World\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=286&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="422" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/InGoa24x7.png" group-title="🌟India - JioTV+",In Goa 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=422&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="463" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_HD_World.png" group-title="🌟India - JioTV+",Discovery HD World\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=463&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="541" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Turbo.png" group-title="🌟India - JioTV+",Discovery Turbo\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=541&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="566" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Animal_Planet_Hindi.png" group-title="🌟India - JioTV+",Animal Planet Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=566&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="567" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Animal_Planet_English.png" group-title="🌟India - JioTV+",Animal Planet English\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=567&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="568" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Science.png" group-title="🌟India - JioTV+",Discovery Science\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=568&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="569" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Channel_Tamil.png" group-title="🌟India - JioTV+",D Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=569&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="573" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Channel_Bengali.png" group-title="🌟India - JioTV+",Discovery Channel Bengali\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=573&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="578" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/History_18_Hindi.png" group-title="🌟India - JioTV+",History TV18 HD Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=578&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="579" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/History_18_Tamil.png" group-title="🌟India - JioTV+",History TV18 HD Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=579&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="580" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_bharati.png" group-title="🌟India - JioTV+",DD bharati\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=580&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="583" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Kisan.png" group-title="🌟India - JioTV+",DD Kisan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=583&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="871" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Events.png" group-title="🌟India - JioTV+",Jio Events HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=871&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="906" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Desi_Channel.png" group-title="🌟India - JioTV+",Desi Channel\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=906&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1073" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Samara_News.png" group-title="🌟India - JioTV+",Samara News\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1073&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1075" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ayush_TV.png" group-title="🌟India - JioTV+",Ayush TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1075&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1162" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prime_Asia_Tv.png" group-title="🌟India - JioTV+",Prime Asia TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1162&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1219" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Animal_Planet_HD_Tamil.png" group-title="🌟India - JioTV+",Animal Planet HD Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1219&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1252" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEHZEEB_TV.png" group-title="🌟India - JioTV+",Tehzeeb TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1252&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1265" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Global_Sanjh.png" group-title="🌟India - JioTV+",Global Sanjh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1265&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1455" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Janapriyam_News.png" group-title="🌟India - JioTV+",Janapriyam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1455&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1464" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Daijiworld_TV_24X7.png" group-title="🌟India - JioTV+",Daijiworld TV 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1464&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1471" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/History_TV18_SD.png" group-title="🌟India - JioTV+",History TV18 SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1471&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1534" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/World_Punjab.png" group-title="🌟India - JioTV+",World Punjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1534&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1552" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Malnadu_TV.png" group-title="🌟India - JioTV+",Malanadu TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1552&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1557" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Express_TV.png" group-title="🌟India - JioTV+",Express TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1557&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1561" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sristi_TV.png" group-title="🌟India - JioTV+",Sristi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1561&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1606" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ken_Kerelam_TV.png" group-title="🌟India - JioTV+",Ken TV Keralam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1606&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1666" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Safari_TV.png" group-title="🌟India - JioTV+",Safari TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1666&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1696" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SSV_TV.png" group-title="🌟India - JioTV+",SSV TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1696&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1740" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Purnima_TV.png" group-title="🌟India - JioTV+",Purnima TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1740&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1768" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Naaptol.png" group-title="🌟India - JioTV+",Naaptol\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1768&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2011" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ekamra_Bharat_Odia.png" group-title="🌟India - JioTV+",Ekamra Bharat Odia\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2011&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2184" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/U_Bangla.png" group-title="🌟India - JioTV+",U Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2184&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2437" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Wild_Earth.png" group-title="🌟India - JioTV+",Wild Earth\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2437&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2938" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Haryana_Buzz.png" group-title="🌟India - JioTV+",Haryana Buzz\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2938&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="143" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Tv18_Prime_HD.png" group-title="🌟India - JioTV+",CNBC Tv18 Prime HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=143&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="190" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Awaaz.png" group-title="🌟India - JioTV+",CNBC Awaaz\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=190&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="212" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ET_Now.png" group-title="🌟India - JioTV+",ET Now\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=212&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="259" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NDTV_Profit.png" group-title="🌟India - JioTV+",NDTV Profit\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=259&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="489" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Tv_18.png" group-title="🌟India - JioTV+",CNBC Tv 18\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=489&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="490" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CNBC_Bazaar_MNO.png" group-title="🌟India - JioTV+",CNBC Bazaar MNO\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=490&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="657" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Business.png" group-title="🌟India - JioTV+",Zee Business\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=657&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1907" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ET_Now_Swadesh.png" group-title="🌟India - JioTV+",ET Now Swadesh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1907&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="164" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Travel_XP_HD.png" group-title="🌟India - JioTV+",Travelxp HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=164&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="479" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TLC_HD_World.png" group-title="🌟India - JioTV+",TLC HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=479&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="560" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NDTV_Good_Times.png" group-title="🌟India - JioTV+",GOOD TiMES\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=560&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="561" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Food_Food.png" group-title="🌟India - JioTV+",Food Food\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=561&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="562" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Travel_XP.png" group-title="🌟India - JioTV+",Travelxp HD Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=562&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="563" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kaumudy_TV.png" group-title="🌟India - JioTV+",Kaumudy TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=563&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="571" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TLC_Hindi.png" group-title="🌟India - JioTV+",TLC Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=571&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="574" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TLC_English.png" group-title="🌟India - JioTV+",TLC English\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=574&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="795" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Wellness.png" group-title="🌟India - JioTV+",testa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=795&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="797" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sakhi_TV.png" group-title="🌟India - JioTV+",testii\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=797&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="814" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Travel_XP_Tamil.png" group-title="🌟India - JioTV+",Travelxp Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=814&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="953" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Propex_TV.png" group-title="🌟India - JioTV+",Propex TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=953&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1225" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Click_Life.png" group-title="🌟India - JioTV+",Click Life\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1225&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1273" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sugran.png" group-title="🌟India - JioTV+",Sugran\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1273&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1290" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/StarTell.png" group-title="🌟India - JioTV+",Stars Tell\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1290&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1292" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Wellness_TV.png" group-title="🌟India - JioTV+",Wellness\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1292&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1736" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Luxe_Tv_HD.png" group-title="🌟India - JioTV+",LUXE TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1736&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1955" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Food_XP.png" group-title="🌟India - JioTV+",Foodxp\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1955&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2031" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Fashion_India.png" group-title="🌟India - JioTV+",Fashion India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2031&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2757" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Zest_HD.png" group-title="🌟India - JioTV+",Zee Zest HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2757&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2948" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Zest_SD.png" group-title="🌟India - JioTV+",Zee Zest SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2948&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="166" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Cartoon_Network_Telugu.png" group-title="🌟India - JioTV+",Cartoon Network Telugu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=166&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="290" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/sonic_Tamil.png" group-title="🌟India - JioTV+",sonic Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=290&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="542" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pogo_Tamil.png" group-title="🌟India - JioTV+",Pogo Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=542&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="544" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Junior.png" group-title="🌟India - JioTV+",Nick Junior\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=544&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="545" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Hindi.png" group-title="🌟India - JioTV+",Nick Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=545&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="546" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Tamil.png" group-title="🌟India - JioTV+",Nick Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=546&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="547" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nickelodeon.png" group-title="🌟India - JioTV+",Nickelodeon\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=547&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="548" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nickelodeon_Jr.png" group-title="🌟India - JioTV+",Nickelodeon Jr.\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=548&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="550" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Kids_Tamil.png" group-title="🌟India - JioTV+",Discovery Kids Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=550&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="551" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST14_HD.png" group-title="🌟India - JioTV+",TEST14 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=551&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="554" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Discovery_Kids_2.png" group-title="🌟India - JioTV+",Discovery Kids 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=554&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="555" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Chintu_TV.png" group-title="🌟India - JioTV+",Chintu TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=555&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="556" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kochu_TV.png" group-title="🌟India - JioTV+",Kochu TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=556&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="557" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Chutti_TV.png" group-title="🌟India - JioTV+",Chutti TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=557&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="559" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pogo_Hindi.png" group-title="🌟India - JioTV+",Pogo Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=559&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="815" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/sonic_Hindi.png" group-title="🌟India - JioTV+",Sonic Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=815&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="816" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Cartoon_Network_Hindi.png" group-title="🌟India - JioTV+",Cartoon Network Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=816&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="817" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Cartoon_Network_Tamil.png" group-title="🌟India - JioTV+",Cartoon Network Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=817&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="872" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Yay_Hindi.png" group-title="🌟India - JioTV+",Sony Yay Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=872&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="873" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Yay_Tamil.png" group-title="🌟India - JioTV+",Sony Yay Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=873&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1079" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CN_HD_English.png" group-title="🌟India - JioTV+",CN HD+ English\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1079&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1081" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CN_HD_Tamil.png" group-title="🌟India - JioTV+",CN HD+ Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1081&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1216" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Highbrow.png" group-title="🌟India - JioTV+",Highbrow\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1216&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1226" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_HD_Plus.png" group-title="🌟India - JioTV+",Nick HD+\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1226&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1243" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sonic_Kannada.png" group-title="🌟India - JioTV+",Sonic Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1243&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1244" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Kannada.png" group-title="🌟India - JioTV+",Nick Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1244&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1340" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Malayalam.png" group-title="🌟India - JioTV+",Nick Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1340&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1341" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Bangla.png" group-title="🌟India - JioTV+",Nick Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1341&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1342" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nick_Marathi.png" group-title="🌟India - JioTV+",Nick Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1342&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1344" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sonic_Malayalam.png" group-title="🌟India - JioTV+",Sonic Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1344&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1345" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sonic_Bangla.png" group-title="🌟India - JioTV+",Sonic Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1345&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1346" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sonic_Marathi.png" group-title="🌟India - JioTV+",Sonic Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1346&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1430" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_KIDS.png" group-title="🌟India - JioTV+",Jio KIDS\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1430&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1667" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rongeen_TV.png" group-title="🌟India - JioTV+",Rongeen TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1667&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1780" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hoopla_Kids_TV.png" group-title="🌟India - JioTV+",HooplaKidz TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1780&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1920" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/The_Q_Kahaniyan.png" group-title="🌟India - JioTV+",The Q Kahaniyan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1920&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2774" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Power_Kids_TV.png" group-title="🌟India - JioTV+",Power Kids TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2774&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="175" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aastha.png" group-title="🌟India - JioTV+",Aastha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=175&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="288" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanskar.png" group-title="🌟India - JioTV+",Sanskar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=288&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="466" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Arihant_TV.png" group-title="🌟India - JioTV+",Arihant TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=466&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="593" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhna.png" group-title="🌟India - JioTV+",Sadhna\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=593&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="594" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aastha_Bhajan.png" group-title="🌟India - JioTV+",Aastha Bhajan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=594&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="596" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jinvani_TV.png" group-title="🌟India - JioTV+",Jinvani TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=596&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="597" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Satsang_TV.png" group-title="🌟India - JioTV+",Satsang TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=597&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="599" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Disha_tv.png" group-title="🌟India - JioTV+",Disha tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=599&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="601" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ishwar_TV.png" group-title="🌟India - JioTV+",Ishwar TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=601&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="602" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Paras_tv.png" group-title="🌟India - JioTV+",Paras tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=602&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="603" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nambikkai.png" group-title="🌟India - JioTV+",Nambikkai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=603&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="605" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Channel_Win.png" group-title="🌟India - JioTV+",Channel Win\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=605&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="606" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shalom.png" group-title="🌟India - JioTV+",Shalom\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=606&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="607" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Subhavartha_TV.png" group-title="🌟India - JioTV+",Subhavartha TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=607&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="608" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shubhsandesh_TV.png" group-title="🌟India - JioTV+",Shubhsandesh TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=608&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="609" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/mh1_Shraddha.png" group-title="🌟India - JioTV+",mh1 Shraddha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=609&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="611" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Darshan_24.png" group-title="🌟India - JioTV+",Darshan 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=611&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="794" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Peace_of_Mind.png" group-title="🌟India - JioTV+",Peace of Mind\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=794&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="801" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Divya_TV.png" group-title="🌟India - JioTV+",Divya TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=801&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="828" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shubh_TV.png" group-title="🌟India - JioTV+",Shubh TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=828&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="829" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sri_Sankara.png" group-title="🌟India - JioTV+",Sri Sankara\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=829&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="835" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Angel_TV_HD.png" group-title="🌟India - JioTV+",Angel TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=835&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="856" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vedic_TV.png" group-title="🌟India - JioTV+",Vedic TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=856&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="879" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Harekrsna.png" group-title="🌟India - JioTV+",Hare krsna\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=879&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="886" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Lakshya_TV.png" group-title="🌟India - JioTV+",Lakshya TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=886&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="887" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Garv_Swaminarayan.png" group-title="🌟India - JioTV+",Swar Shree\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=887&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="924" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rujumargam_TV.png" group-title="🌟India - JioTV+",Mercy TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=924&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="934" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Divya_Vani.png" group-title="🌟India - JioTV+",Divya Vani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=934&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="937" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SaiTV.png" group-title="🌟India - JioTV+",Sai TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=937&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="939" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhaktisagar.png" group-title="🌟India - JioTV+",Bhaktisagar 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=939&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="952" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/GarvGurbani.png" group-title="🌟India - JioTV+",Garv Punjabi Gurbani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=952&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="961" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/JUSOne.png" group-title="🌟India - JioTV+",JUSOne\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=961&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="964" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Om_Shanti.png" group-title="🌟India - JioTV+",Om Shanti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=964&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="972" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sarv_Dharam_Sangam.png" group-title="🌟India - JioTV+",Sarv Dharam Sangam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=972&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="977" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Calvary.png" group-title="🌟India - JioTV+",Calvary\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=977&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1077" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sharnam_TV.png" group-title="🌟India - JioTV+",Sharnam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1077&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1078" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Soham_TV.png" group-title="🌟India - JioTV+",Soham TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1078&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1099" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hamari_Sanskruti_TV.png" group-title="🌟India - JioTV+",Hamari Sanskruti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1099&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1159" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tulja_Bhavani.png" group-title="🌟India - JioTV+",Tulja Bhavani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1159&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1174" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Fateh_TV.png" group-title="🌟India - JioTV+",Fateh TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1174&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1175" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Awakening.png" group-title="🌟India - JioTV+",Awakening\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1175&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1176" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SRMD.png" group-title="🌟India - JioTV+",SRMD HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1176&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1186" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kartavya_Tv.png" group-title="🌟India - JioTV+",Kartavya TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1186&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1187" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Valambhakti.png" group-title="🌟India - JioTV+",Valam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1187&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1191" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_Simran.png" group-title="🌟India - JioTV+",PTC Simran\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1191&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1193" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hare_Krsna_music.png" group-title="🌟India - JioTV+",Hare Krsna Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1193&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1201" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhguru_Television.png" group-title="🌟India - JioTV+",Sadhguru Television HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1201&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1212" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hare_Krsna_Pravachan.png" group-title="🌟India - JioTV+",Hare Krsna Pravachan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1212&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1217" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/LordShri_Vitthal.png" group-title="🌟India - JioTV+",Lord Shri Vitthal Rukmini\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1217&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1220" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rajyoga_TV.png" group-title="🌟India - JioTV+",Rajyoga TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1220&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1221" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rajyoga_Malayalam.png" group-title="🌟India - JioTV+",Rajyoga TV Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1221&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1222" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/GovindDevji_Jaipur.png" group-title="🌟India - JioTV+",Mandir Shri Govinddevji-Jaipur\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1222&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1223" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dagdusheth_Pune.png" group-title="🌟India - JioTV+",Dagdusheth Ganpati - Pune\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1223&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1224" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nimbark.png" group-title="🌟India - JioTV+",Nimbark TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1224&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1230" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VR_360.png" group-title="🌟India - JioTV+",PTC VR\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1230&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1241" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/God_TV.png" group-title="🌟India - JioTV+",God TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1241&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1255" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aastha_Tamil.png" group-title="🌟India - JioTV+",Aastha Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1255&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1256" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aastha_Kannada.png" group-title="🌟India - JioTV+",Aastha Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1256&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1271" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Udupi_Krishna_Temple.png" group-title="🌟India - JioTV+",Sri Krishna Matha Udupi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1271&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1278" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prarthana_Bhawan.png" group-title="🌟India - JioTV+",Prarthana Bhawan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1278&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1283" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hanuman_Mahavir_Temple.png" group-title="🌟India - JioTV+",Mahavir Mandir Patna\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1283&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1284" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vignesh_TV.PNG" group-title="🌟India - JioTV+",Vignesh TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1284&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1288" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Omkareshwar_Temple.png" group-title="🌟India - JioTV+",Shri Omkareshwar Mandir\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1288&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1315" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/HHDL.png" group-title="🌟India - JioTV+",HHDL\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1315&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1388" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Goodness_TV.png" group-title="🌟India - JioTV+",Goodness\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1388&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1407" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sai_Leela.png" group-title="🌟India - JioTV+",Sai Leela\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1407&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1412" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shani_Shingnapur.png" group-title="🌟India - JioTV+",Shani Shingnapur\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1412&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1414" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Prati_Shirdi_Saibaba.png" group-title="🌟India - JioTV+",Prati Shirdi Saibaba\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1414&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1415" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ganga_Darshan_Varanasi.png" group-title="🌟India - JioTV+",Ganga Darshan Varanasi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1415&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1417" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SVBC2.png" group-title="🌟India - JioTV+",SVBC2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1417&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1418" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ichhapuran_Balaji_Rajasthan.png" group-title="🌟India - JioTV+",Ichhapuran Balaji Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1418&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1419" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Iskon_Girgaon.png" group-title="🌟India - JioTV+",Iskon Girgaon\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1419&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1420" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ashtavinayak_Ranjangaon.png" group-title="🌟India - JioTV+",Ashtavinayak Ranjangaon\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1420&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1421" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Karani_Mata_Rajasthan.png" group-title="🌟India - JioTV+",Karani Mata Rajasthan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1421&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1422" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mahalaxmi_Mumbai.png" group-title="🌟India - JioTV+",Mahalaxmi Mumbai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1422&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1423" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Babulnaath_Mumbai.png" group-title="🌟India - JioTV+",Babulnaath Mumbai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1423&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1424" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mumbadevi_Mumbai.png" group-title="🌟India - JioTV+",Mumbadevi Mumbai\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1424&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1426" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Santvani.png" group-title="🌟India - JioTV+",Santvani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1426&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1438" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Velukkudi_Discourses.png" group-title="🌟India - JioTV+",Velukkudi Discourses\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1438&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1440" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Krishna_Vani.png" group-title="🌟India - JioTV+",Krishna Vani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1440&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1454" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shiksha_TV.png" group-title="🌟India - JioTV+",Shiksha TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1454&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1458" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gurkebaani.png" group-title="🌟India - JioTV+",Gurkibani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1458&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1463" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Moti_Doongri.png" group-title="🌟India - JioTV+",Shree Ganesh - Moti Doongri Jaipur\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1463&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1479" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nakoda_Temple.png" group-title="🌟India - JioTV+",Shri Jain Nakoda Parshwanath Tirth\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1479&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1482" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Amma.png" group-title="🌟India - JioTV+",AMMA TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1482&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1537" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RadheKrishna_TV.png" group-title="🌟India - JioTV+",RadheKrishna TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1537&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1539" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sangat_TV.png" group-title="🌟India - JioTV+",Sangat TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1539&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1543" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Subharti.png" group-title="🌟India - JioTV+",Subharti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1543&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1548" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Khandoba_Majha_Jejuri.png" group-title="🌟India - JioTV+",Jejuri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1548&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1549" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DharmaGranth_TV.png" group-title="🌟India - JioTV+",Dharm Granth TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1549&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1554" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanatan_TV.png" group-title="🌟India - JioTV+",Sanatan TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1554&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1559" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jigyasa_TV.png" group-title="🌟India - JioTV+",Jigyasa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1559&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1560" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/35mm.png" group-title="🌟India - JioTV+",35mm\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1560&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1568" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Atmadarshan_TV.png" group-title="🌟India - JioTV+",Atmadarshan TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1568&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1605" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bangla_Bhakti.png" group-title="🌟India - JioTV+",Bangla Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1605&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1607" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manav_Dharam.png" group-title="🌟India - JioTV+",Manav Dharam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1607&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1609" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ishvani_TV.png" group-title="🌟India - JioTV+",Ishvani TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1609&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1643" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Harvest_TV_24x7.png" group-title="🌟India - JioTV+",Harvest TV 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1643&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1655" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Madha_TV.png" group-title="🌟India - JioTV+",Madha TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1655&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1690" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/BVTV.png" group-title="🌟India - JioTV+",BVTV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1690&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1705" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shri_Hingulambika_Devi_Temple.png" group-title="🌟India - JioTV+",Shri Hingulambika Devi Temple\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1705&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1706" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shri_Mangal_Dev_Grah_Temple.png" group-title="🌟India - JioTV+",Shri Mangal Dev Grah Temple\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1706&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1734" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ek_Onkar.png" group-title="🌟India - JioTV+",Ek Onkar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1734&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1738" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Hosanna_TV.png" group-title="🌟India - JioTV+",Hosanna TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1738&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1742" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanskrit_Ganga_TV.png" group-title="🌟India - JioTV+",Sanskrit Ganga\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1742&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1764" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dadabhagwan.png" group-title="🌟India - JioTV+",Dada Bhagwan Foundation\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1764&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1787" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VISVAS.png" group-title="🌟India - JioTV+",VISVAS\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1787&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1788" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Yeshuaa.png" group-title="🌟India - JioTV+",Yeshuaa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1788&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1789" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dada_Bhagwan_Foundation_Gujarati.png" group-title="🌟India - JioTV+",Dada Bhagwan Foundation Gujarati\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1789&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1794" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mangalmaylive.png" group-title="🌟India - JioTV+",Mangalmay Live\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1794&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1795" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shri_Amarnath_Shrine_Board.png" group-title="🌟India - JioTV+",Shri Amarnathji Shrine Board\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1795&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1838" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Devam.png" group-title="🌟India - JioTV+",Sadhna Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1838&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1847" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Harpal_TV.png" group-title="🌟India - JioTV+",Z10 TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1847&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1858" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SVBC3.png" group-title="🌟India - JioTV+",SVBC3\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1858&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1859" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SVBC4.png" group-title="🌟India - JioTV+",SVBC4\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1859&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1885" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kripa_TV.png" group-title="🌟India - JioTV+",Kripa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1885&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1901" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Adhyatam_TV.png" group-title="🌟India - JioTV+",Adhyatam TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1901&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1926" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanskriti_24x7.png" group-title="🌟India - JioTV+",Sanskriti 24x7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1926&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1933" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Shri_Trimbakeshwar_Devasthan.png" group-title="🌟India - JioTV+",Shri Trimbakeshwar Devasthan Trust\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1933&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1958" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sidharth_Bhakti.png" group-title="🌟India - JioTV+",Sidharth Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1958&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1967" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PMC_Hindi.png" group-title="🌟India - JioTV+",PMC Hindi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1967&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2002" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/" group-title="🌟India - JioTV+",Aadinath TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2002&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2006" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sattva_TV.png" group-title="🌟India - JioTV+",Sattva TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2006&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2012" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Paramatma.png" group-title="🌟India - JioTV+",Paramatma\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2012&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2028" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadvidya_TV.png" group-title="🌟India - JioTV+",Sadvidya TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2028&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2029" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aaryaa_Bhakti.png" group-title="🌟India - JioTV+",Aaryaa Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2029&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2035" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Amritwani.png" group-title="🌟India - JioTV+",Amritwani\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2035&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2041" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhakti_Sagar.png" group-title="🌟India - JioTV+",Bhakti Sagar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2041&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2045" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Auroville_TV.png" group-title="🌟India - JioTV+",Auroville TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2045&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2177" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Arya_Sandesh_Tv.png" group-title="🌟India - JioTV+",Arya Sandesh TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2177&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2192" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gurukul_Rajkot.png" group-title="🌟India - JioTV+",Gurukul\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2192&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2205" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Guruvayur_Devaswom.png" group-title="🌟India - JioTV+",Guruvayur Devaswom\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2205&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2322" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Divyalok_TV.png" group-title="🌟India - JioTV+",Divyalok TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2322&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2351" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SRS_Bhakti_TV.png" group-title="🌟India - JioTV+",SRS Bhakti TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2351&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2388" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhguru_Television_SD.png" group-title="🌟India - JioTV+",Sadhguru Television SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2388&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2448" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Desika_daya.png" group-title="🌟India - JioTV+",Desika daya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2448&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2686" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jyothishavartha.png" group-title="🌟India - JioTV+",Jyothishavartha\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2686&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2768" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jothi_TV.png" group-title="🌟India - JioTV+",Jothi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2768&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2769" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Harvest_TV_Keralam.png" group-title="🌟India - JioTV+",Harvest TV Keralam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2769&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2775" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Grace_TV.png" group-title="🌟India - JioTV+",Grace TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2775&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2784" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ISKCON_Bangalore.png" group-title="🌟India - JioTV+",ISKCON Bangalore\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2784&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2917" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sadhna_Gold.png" group-title="🌟India - JioTV+",Sadhna Gold\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2917&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2947" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jeewan_Bhakti.png" group-title="🌟India - JioTV+",Jeewan Bhakti\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2947&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="183" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/B4U_Music.png" group-title="🌟India - JioTV+",B4U Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=183&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="248" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MTV.png" group-title="🌟India - JioTV+",MTV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=248&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="250" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Music_India.png" group-title="🌟India - JioTV+",Music India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=250&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="420" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jaya_Max.png" group-title="🌟India - JioTV+",Jaya Max\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=420&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="440" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/9X_Jalwa.png" group-title="🌟India - JioTV+",9X Jalwa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=440&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="441" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/9x_Jhakaas.png" group-title="🌟India - JioTV+",9x Jhakaas\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=441&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="584" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mastiii.png" group-title="🌟India - JioTV+",Mastiii\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=584&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="585" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zing.png" group-title="🌟India - JioTV+",Zing\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=585&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="587" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/9XM.png" group-title="🌟India - JioTV+",9XM\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=587&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="591" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/E_24.png" group-title="🌟India - JioTV+",E 24\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=591&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="592" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zoom.png" group-title="🌟India - JioTV+",ZOOM\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=592&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="639" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ramdhenu.png" group-title="🌟India - JioTV+",Ramdhenu\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=639&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="732" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/9X_Tashan.png" group-title="🌟India - JioTV+",9X Tashan\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=732&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="735" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sangeet_Marathi.png" group-title="🌟India - JioTV+",Sangeet Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=735&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="739" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Music_Malayalam.png" group-title="🌟India - JioTV+",Raj Music Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=739&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="740" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sangeet_Bangla.png" group-title="🌟India - JioTV+",Sangeet Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=740&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="741" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sangeet_Bhojpuri.png" group-title="🌟India - JioTV+",Sangeet Bhojpuri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=741&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="742" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/mh1_Music.png" group-title="🌟India - JioTV+",mh1 Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=742&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="743" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Music_Kannada.png" group-title="🌟India - JioTV+",Raj Music Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=743&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="744" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Udaya_Music.png" group-title="🌟India - JioTV+",Udaya Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=744&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="747" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Surya_Music.png" group-title="🌟India - JioTV+",Surya Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=747&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="748" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Musix.png" group-title="🌟India - JioTV+",Raj Musix\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=748&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="753" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MTV_Beats_HD.png" group-title="🌟India - JioTV+",MTV Beats HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=753&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="773" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Public_Music.png" group-title="🌟India - JioTV+",Public Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=773&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="786" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kappa_TV.png" group-title="🌟India - JioTV+",Kappa TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=786&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="803" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tunes_6.png" group-title="🌟India - JioTV+",Tunes 6\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=803&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="845" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MK_Music.png" group-title="🌟India - JioTV+",MK Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=845&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="895" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_Music_HD.png" group-title="🌟India - JioTV+",Sun Music HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=895&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="903" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Only_Music.png" group-title="🌟India - JioTV+",Only Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=903&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="905" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PBN_Music.png" group-title="🌟India - JioTV+",PBN Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=905&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="962" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Boogle_Bollywood.png" group-title="🌟India - JioTV+",Boogle Bollywood\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=962&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1103" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PEACE_MUSIC.png" group-title="🌟India - JioTV+",PEACE MUSIC\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1103&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1145" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MTV_HD_Plus.png" group-title="🌟India - JioTV+",MTV HD Plus\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1145&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1172" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_Chak_De.png" group-title="🌟India - JioTV+",PTC Chak De\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1172&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1184" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Steelbird_Music.png" group-title="🌟India - JioTV+",Steelbird Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1184&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1188" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_DHOL_TV.png" group-title="🌟India - JioTV+",PTC DHOL TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1188&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1189" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTC_Music.png" group-title="🌟India - JioTV+",PTC Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1189&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1192" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Brit_Asia.png" group-title="🌟India - JioTV+",Brit Asia\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1192&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1245" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sakkat.png" group-title="🌟India - JioTV+",Sakkat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1245&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1248" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bol_Hadippa.png" group-title="🌟India - JioTV+",Bol Hadippa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1248&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1249" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Kadak_Hits.png" group-title="🌟India - JioTV+",Kadak Hits\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1249&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1286" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Insync.png" group-title="🌟India - JioTV+",Insync\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1286&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1320" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VH1_HD.png" group-title="🌟India - JioTV+",VH1 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1320&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1378" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/VH1.png" group-title="🌟India - JioTV+",VH1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1378&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1400" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/MTV_Beats_SD.png" group-title="🌟India - JioTV+",MTV Beats SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1400&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1411" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SongDew_TV.png" group-title="🌟India - JioTV+",SongDew TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1411&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1441" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Wah_Punjabi.png" group-title="🌟India - JioTV+",Wah Punjabi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1441&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1453" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Balle_Balle_TV.png" group-title="🌟India - JioTV+",Balle Balle TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1453&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1527" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Haryanvi_Hits.png" group-title="🌟India - JioTV+",Haryanvi Hits\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1527&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1694" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Haryana_Beats.png" group-title="🌟India - JioTV+",Haryana Beats\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1694&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1708" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/SKY_12.png" group-title="🌟India - JioTV+",SKY 12\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1708&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1871" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/7X_Music.png" group-title="🌟India - JioTV+",7X Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1871&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2015" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ekamra_Music.png" group-title="🌟India - JioTV+",Ekamra Musiq\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2015&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2036" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dil_Se.png" group-title="🌟India - JioTV+",Dil Se\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2036&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2037" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Pop_Pataka.png" group-title="🌟India - JioTV+",Pop Pataka\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2037&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2038" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dhamaal.png" group-title="🌟India - JioTV+",Dhamaal\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2038&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2039" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Adipolli.png" group-title="🌟India - JioTV+",Adipolli\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2039&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2042" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Nazraana.png" group-title="🌟India - JioTV+",Nazraana\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2042&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2043" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Artist_Aloud.png" group-title="🌟India - JioTV+",Artist Aloud\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2043&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2063" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/RS_Bharat.png" group-title="🌟India - JioTV+",RS Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2063&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2064" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Merchant_Records.png" group-title="🌟India - JioTV+",Merchant Records\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2064&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2065" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saregama_Music.png" group-title="🌟India - JioTV+",Saregama Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2065&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2229" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Bhojpuri_Junction.png" group-title="🌟India - JioTV+",Bhojpuri Junction\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2229&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2230" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jio_Specials_HD.png" group-title="🌟India - JioTV+",Jio Specials HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2230&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2252" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Desi_Music_Station.png" group-title="🌟India - JioTV+",Desi Music Station\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2252&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2325" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjabi_Melodies.png" group-title="🌟India - JioTV+",Punjabi Melodies\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2325&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2750" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saga_Music.png" group-title="🌟India - JioTV+",Saga Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2750&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2751" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saga_Music_Haryanvi.png" group-title="🌟India - JioTV+",Saga Music Haryanvi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2751&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2752" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Ghaint_Punjab.png" group-title="🌟India - JioTV+",Ghaint Punjab\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2752&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2753" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/YRF_Music.png" group-title="🌟India - JioTV+",YRF Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2753&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2754" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sikh_Ratnavali.png" group-title="🌟India - JioTV+",Sikh Ratnavali\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2754&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2755" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saregama_Hum_Bhojpuri.png" group-title="🌟India - JioTV+",Saregama Hum Bhojpuri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2755&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2934" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjabi_Hits.png" group-title="🌟India - JioTV+",Punjabi Hits\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2934&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2936" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Oye_Music.png" group-title="🌟India - JioTV+",Oye Music\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2936&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2939" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Coke_Studio_Tamil.png" group-title="🌟India - JioTV+",Coke Studio Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2939&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2944" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Coke_Studio_Bharat.png" group-title="🌟India - JioTV+",Coke Studio Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2944&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3003" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CokeStudio_Bharat_S1.png" group-title="🌟India - JioTV+",Coke Studio Bharat Season 1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3003&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="3006" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dhoom_Music_Bangla.png" group-title="🌟India - JioTV+",Dhoom Music Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=3006&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="400" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_1.png" group-title="🌟India - JioTV+",PM e Vidya 01\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=400&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="401" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_19.png" group-title="🌟India - JioTV+",Swayam Prabha 19\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=401&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="402" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_2.png" group-title="🌟India - JioTV+",PM e Vidya 02\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=402&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="403" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_20.png" group-title="🌟India - JioTV+",Swayam Prabha 20\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=403&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="404" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_7.png" group-title="🌟India - JioTV+",PM e Vidya 07\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=404&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="405" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_3.png" group-title="🌟India - JioTV+",PM e Vidya 03\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=405&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="406" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_4.png" group-title="🌟India - JioTV+",PM e Vidya 04\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=406&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="407" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_5.png" group-title="🌟India - JioTV+",PM e Vidya 05\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=407&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="408" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_6.png" group-title="🌟India - JioTV+",PM e Vidya 06\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=408&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="409" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/_evidya_8.png" group-title="🌟India - JioTV+",PM e Vidya 08\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=409&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="410" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_9.png" group-title="🌟India - JioTV+",PM e Vidya 09\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=410&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="411" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_10.png" group-title="🌟India - JioTV+",PM e Vidya 10\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=411&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="980" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_01.png" group-title="🌟India - JioTV+",Swayam Prabha 01\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=980&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="981" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_02.png" group-title="🌟India - JioTV+",Swayam Prabha 02\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=981&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="982" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_03.png" group-title="🌟India - JioTV+",Swayam Prabha 03\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=982&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="983" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_08.png" group-title="🌟India - JioTV+",Swayam Prabha 08\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=983&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="984" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_04.png" group-title="🌟India - JioTV+",Swayam Prabha 04\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=984&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="985" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_07.png" group-title="🌟India - JioTV+",Swayam Prabha 07\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=985&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="986" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_05.png" group-title="🌟India - JioTV+",Swayam Prabha 05\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=986&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="987" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_06.png" group-title="🌟India - JioTV+",Swayam Prabha 06\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=987&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="988" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_09.png" group-title="🌟India - JioTV+",Swayam Prabha 09\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=988&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="989" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_10.png" group-title="🌟India - JioTV+",Swayam Prabha 10\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=989&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="990" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_11.png" group-title="🌟India - JioTV+",Swayam Prabha 11\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=990&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="991" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_12.png" group-title="🌟India - JioTV+",Swayam Prabha 12\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=991&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="992" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_13.png" group-title="🌟India - JioTV+",Swayam Prabha 13\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=992&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="993" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_14.png" group-title="🌟India - JioTV+",Swayam Prabha 14\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=993&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="994" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_16.png" group-title="🌟India - JioTV+",Swayam Prabha 16\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=994&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="995" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_15.png" group-title="🌟India - JioTV+",Swayam Prabha 15\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=995&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="996" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_17.png" group-title="🌟India - JioTV+",Swayam Prabha 17\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=996&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="997" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_21.png" group-title="🌟India - JioTV+",Swayam Prabha 21\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=997&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="998" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_22.png" group-title="🌟India - JioTV+",Swayam Prabha 22\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=998&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="999" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swayam_Prabha_18.png" group-title="🌟India - JioTV+",Swayam Prabha 18\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=999&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1069" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_1.png" group-title="🌟India - JioTV+",Vande Gujarat 1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1069&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1070" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_2.png" group-title="🌟India - JioTV+",Vande Gujarat 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1070&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1071" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_4.png" group-title="🌟India - JioTV+",Vande Gujarat 4\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1071&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1082" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_3.png" group-title="🌟India - JioTV+",Vande Gujarat 3\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1082&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1083" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_5.png" group-title="🌟India - JioTV+",Vande Gujarat 5\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1083&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1084" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_6.png" group-title="🌟India - JioTV+",Vande Gujarat 6\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1084&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1085" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_7.png" group-title="🌟India - JioTV+",Vande Gujarat 7\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1085&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1086" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_8.png" group-title="🌟India - JioTV+",Vande Gujarat 8\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1086&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1087" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_9.png" group-title="🌟India - JioTV+",Vande Gujarat 9\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1087&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1088" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_10.png" group-title="🌟India - JioTV+",Vande Gujarat 10\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1088&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1089" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_11.png" group-title="🌟India - JioTV+",Vande Gujarat 11\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1089&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1090" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_12.png" group-title="🌟India - JioTV+",Vande Gujarat 12\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1090&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1091" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_13.png" group-title="🌟India - JioTV+",Vande Gujarat 13\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1091&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1092" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_14.png" group-title="🌟India - JioTV+",Vande Gujarat 14\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1092&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1093" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_15.png" group-title="🌟India - JioTV+",Vande Gujarat 15\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1093&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1094" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Vande_Gujarat_16.png" group-title="🌟India - JioTV+",Vande Gujarat 16\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1094&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1227" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Digishala.png" group-title="🌟India - JioTV+",Digishala\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1227&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1337" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Top_Tutor.png" group-title="🌟India - JioTV+",Top Tutor\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1337&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1355" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images//" group-title="🌟India - JioTV+",ALI TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1355&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1410" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_11.png" group-title="🌟India - JioTV+",PM e Vidya 11\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1410&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1428" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gyan_Brikshya.png" group-title="🌟India - JioTV+",Gyan Brikshya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1428&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1429" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/KITE_Victers.png" group-title="🌟India - JioTV+",KITE VICTERS\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1429&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1433" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/India_Science.png" group-title="🌟India - JioTV+",India Science\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1433&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1434" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Utkarsh_Primary.png" group-title="🌟India - JioTV+",Utkarsh Primary\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1434&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1435" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Utkarsh_Middle.png" group-title="🌟India - JioTV+",Utkarsh HSBTE\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1435&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1436" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Utkarsh_Secondary.png" group-title="🌟India - JioTV+",Utkarsh Secondary\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1436&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1437" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Utkarsh_Higher.png" group-title="🌟India - JioTV+",Utkarsh Higher\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1437&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1447" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TV_Teacher.png" group-title="🌟India - JioTV+",TV Teacher\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1447&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1456" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Manipur_Educational_Channel.png" group-title="🌟India - JioTV+",Lairik\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1456&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1521" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Birla_Brainiacs.png" group-title="🌟India - JioTV+",Birla Brainiacs\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1521&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1531" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gyanvani_1.png" group-title="🌟India - JioTV+",Gyanvani 1\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1531&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1532" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/evidya_12.png" group-title="🌟India - JioTV+",PM e Vidya 12\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1532&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1542" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Tute.png" group-title="🌟India - JioTV+",Tute\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1542&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1545" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Punjab_School_TV.png" group-title="🌟India - JioTV+",Punjab School TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1545&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1562" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Himshiksha_Elementary.png" group-title="🌟India - JioTV+",Himshiksha Elementary\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1562&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1563" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Himshiksha_Higher.png" group-title="🌟India - JioTV+",Himshiksha Higher\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1563&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1564" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Himshiksha_Vocational.png" group-title="🌟India - JioTV+",Himshiksha Vocational\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1564&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1565" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AP_BIE_ARTS.png" group-title="🌟India - JioTV+",AP-BIE-ARTS\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1565&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1566" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AP_BIE_SCIENCE.png" group-title="🌟India - JioTV+",AP-BIE-SCIENCE\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1566&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1567" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/AP_CIE_SIVE.png" group-title="🌟India - JioTV+",AP-CIE-SIVE\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1567&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1590" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sanskritam.png" group-title="🌟India - JioTV+",Sanskrit\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1590&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1593" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Lifology.png" group-title="🌟India - JioTV+",Lifology\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1593&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1613" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Medha_Secondary.png" group-title="🌟India - JioTV+",Medha Secondary\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1613&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1614" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Omnicuris.png" group-title="🌟India - JioTV+",Omnicuris\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1614&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1672" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Gyanvani_2.png" group-title="🌟India - JioTV+",Gyanvani 2\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1672&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1673" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/PTD_Chhattisgarrh.png" group-title="🌟India - JioTV+",PTD Chhattisgarrh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1673&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1826" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Swarlasika.png" group-title="🌟India - JioTV+",Swaralasika Sangeetalaya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1826&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1827" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aakash_EduTV_NEET.png" group-title="🌟India - JioTV+",Aakash EduTV NEET\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1827&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1851" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aakash_EduTV_JEE.png" group-title="🌟India - JioTV+",Aakash EduTV JEE\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1851&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1894" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Padhega_Bharat.png" group-title="🌟India - JioTV+",Padhega Bharat\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1894&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2003" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Crypto_TV.0-TV" group-title="🌟India - JioTV+",3.0 TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2003&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2034" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NSDC_TV.png" group-title="🌟India - JioTV+",NSDC TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2034&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2328" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CyberPeace_TV.png" group-title="🌟India - JioTV+",CyberPeace TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2328&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2352" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Narikaa.png" group-title="🌟India - JioTV+",Narikaa\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2352&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2687" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/NTBD_Channel.png" group-title="🌟India - JioTV+",The Book Channel\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2687&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2781" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/CENTA_TV.png" group-title="🌟India - JioTV+",CENTA TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2781&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="2860" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ICAI.png" group-title="🌟India - JioTV+",ICMAI-Delhi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=2860&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1148" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/TEST8_HD.png" group-title="🌟India - JioTV+",TEST8 HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1148&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="144" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_HD.png" group-title="🌟India - JioTV+",Colors HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=144&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="167" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_TV_HD.png" group-title="🌟India - JioTV+",Zee TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=167&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="757" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Kannada_HD.png" group-title="🌟India - JioTV+",Colors Kannada HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=757&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="291" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_HD.png" group-title="🌟India - JioTV+",SET HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=291&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="755" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Marathi_HD.png" group-title="🌟India - JioTV+",Colors Marathi HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=755&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="471" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_SAB_HD.png" group-title="🌟India - JioTV+",Sony SAB HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=471&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="154" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_SAB.png" group-title="🌟India - JioTV+",Sony SAB\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=154&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="625" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Bangla.png" group-title="🌟India - JioTV+",Zee Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=625&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1370" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Kannada_SD.png" group-title="🌟India - JioTV+",Colors Kannada SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1370&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="701" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dangal.png" group-title="🌟India - JioTV+",Dangal\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=701&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="472" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/And_TV_HD.png" group-title="🌟India - JioTV+",And TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=472&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="445" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Marathi.png" group-title="🌟India - JioTV+",Zee Marathi\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=445&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1977" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Bangla_HD.png" group-title="🌟India - JioTV+",Zee Bangla HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1977&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="722" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sarthak_TV.png" group-title="🌟India - JioTV+",Zee Sarthak\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=722&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1326" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Marathi_SD.png" group-title="🌟India - JioTV+",Colors Marathi SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1326&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="628" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Tamil.png" group-title="🌟India - JioTV+",Zee Tamil\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=628&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="689" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Kannada.png" group-title="🌟India - JioTV+",Zee Kannada\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=689&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="1368" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_SD.png" group-title="🌟India - JioTV+",Colors SD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=1368&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="474" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_Pal.png" group-title="🌟India - JioTV+",Sony Pal\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=474&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="196" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Gujarati.png" group-title="🌟India - JioTV+",Colors Gujarati\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=196&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="896" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sun_TV_HD.png" group-title="🌟India - JioTV+",Sun TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=896&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="279" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rishtey.png" group-title="🌟India - JioTV+",Rishtey\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=279&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="198" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Oriya.png" group-title="🌟India - JioTV+",Colors Oriya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=198&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="756" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Bengali_HD.png" group-title="🌟India - JioTV+",Colors Bengali HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=756&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="202" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_National.png" group-title="🌟India - JioTV+",DD National\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=202&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="414" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Yuva.png" group-title="🌟India - JioTV+",Zee Yuva\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=414&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="419" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Jaya_TV_HD.png" group-title="🌟India - JioTV+",Jaya TV HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=419&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="429" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Tamil_HD.png" group-title="🌟India - JioTV+",Colors Tamil HD\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=429&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="473" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Zee_Anmol.png" group-title="🌟India - JioTV+",Zee Anmol\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=473&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="481" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Epic_HD.png" group-title="🌟India - JioTV+",Epic\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=481&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="485" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Enterr_10.png" group-title="🌟India - JioTV+",Enterr 10\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=485&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="527" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/ID.png" group-title="🌟India - JioTV+",Investigation Discovery\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=527&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="528" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_India.png" group-title="🌟India - JioTV+",DD India\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=528&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="532" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dabangg.png" group-title="🌟India - JioTV+",Dabangg\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=532&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="533" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_Pariwar.png" group-title="🌟India - JioTV+",Raj Pariwar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=533&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="534" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dillagi_TV.png" group-title="🌟India - JioTV+",Dillagi TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=534&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="535" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Dhamaal_TV.png" group-title="🌟India - JioTV+",Dhamaal TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=535&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="536" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Madhya_Pradesh.png" group-title="🌟India - JioTV+",DD Madhya Pradesh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=536&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="538" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Rajasthan_Jaipur.png" group-title="🌟India - JioTV+",DD Rajasthan-Jaipur\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=538&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="539" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Bihar.png" group-title="🌟India - JioTV+",DD Bihar\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=539&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="540" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Uttar_Pradesh.png" group-title="🌟India - JioTV+",DD Uttar Pradesh\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=540&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="623" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rang.png" group-title="🌟India - JioTV+",Rang\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=623&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="634" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Flower_TV.png" group-title="🌟India - JioTV+",Flower TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=634&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="635" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Rengoni.png" group-title="🌟India - JioTV+",Rengoni\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=635&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="648" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Mazhavil_Manorama.png" group-title="🌟India - JioTV+",Mazhavil Manorama\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=648&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="690" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Bangla.png" group-title="🌟India - JioTV+",DD Bangla\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=690&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="691" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Saam_Tv.png" group-title="🌟India - JioTV+",Saam Tv\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=691&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="695" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Sahayadri.png" group-title="🌟India - JioTV+",DD Sahayadri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=695&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="697" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Sony_aath.png" group-title="🌟India - JioTV+",Sony aath\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=697&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="698" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Aakaash_bangla.png" group-title="🌟India - JioTV+",Aakash Aath\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=698&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="699" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Malayalam.png" group-title="🌟India - JioTV+",DD Malayalam\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=699&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="702" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Oriya.png" group-title="🌟India - JioTV+",DD Oriya\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=702&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="705" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Polimer_TV.png" group-title="🌟India - JioTV+",Polimer TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=705&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="706" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/DD_Saptagiri.png" group-title="🌟India - JioTV+",DD Saptagiri\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=706&e=.m3u8\n\n';

m3uStr += '#EXTINF:-1 tvg-id="707" tvg-logo="https://jiotv.catchup.cdn.jio.com/dare_images/images/Raj_TV.png" group-title="🌟India - JioTV+",Raj TV\n';
m3uStr += 'https://qrpay.fun/TS-JioTV-main/app/live.php?id=707&e=.m3u8\n\n';



    
    console.log('all done!');
    return m3uStr;


};

export default async function handler(req, res) {
    let uData = {
        tsActive: true
    };

    if (uData.tsActive) {
        let m3uString = await generateM3u(uData);
        res.status(200).send(m3uString);
    }
}
