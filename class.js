class Base{
    constructor(cheerio) {
        this.cheerio = cheerio;
        this.title = 'title';
        this.description = 'meta[name="description"]';
        this.keyword = 'meta[name="keywords"]';
        this.detailContent = '';
        this.publishedDate = 'itemprop="datePublished"';
        this.createDate = 'itemprop="dateCreated"';
    }

    getHeadTitle() {
        return this.cheerio(this.title).html()
    }

    getMetaDescription() {
        return this.cheerio(this.description).attr('content')
    }

    getDetailContent() {
        return this.cheerio(this.detailContent).html()
    }

    getCreateDate() {
        return this.cheerio(this.createDate).attr('content')
    }
}

class VnExpress extends Base{

    constructor(cheerio) {
        super(cheerio)
        this.detailContent = '.fck_detail'
    }
}

class VnExpress2 extends Base{

}

module.exports = {
    VnExpress: VnExpress,
    VnExpress2: VnExpress2
}
