convertLinks = input => {
    let text = input;
    const aLink = [];
    const linksFound = text.match(/(?:www|https?)[^\s]+/g);

    if (linksFound != null) {
        for (let i = 0; i < linksFound.length; i++) {
            let replace = linksFound[i];

            if (!(linksFound[i].match(/(http(s?)):\/\//))) {
                replace = 'http://' + linksFound[i]
            }

            let linkText = replace.split('/')[2];

            if (linkText.substring(0, 3) == 'www') {
                linkText = linkText.replace('www.', '')
            }

            if (linkText.match(/youtu/)) {
                const youtubeID = replace.split('/').slice(-1)[0].split('=')[1];

                if (youtubeID === undefined || youtubeID === '') {
                    aLink.push('<a href="' + replace + '" target="_blank">' + linkText + '</a>');
                } else {
                    aLink.push('<span class="video-wrapper"><iframe src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></span>');
                }
            } else {
                aLink.push('<a href="' + replace + '" target="_blank">' + linkText + '</a>');
            }

            text = text.split(linksFound[i]).map(item => {
                return aLink[i].includes('iframe') ? item.trim() : item
            }).join(aLink[i]);
        }
        return text;
    }
    else {
        return input;
    }
};


const text = '//*[@id="post-body-118372572847181544"]/text()[1]';

convertLinks(text);
