import Contents from '../models/contents.model'
import logger from '../core/logger/app-logger'
const controller = {};


/* single contents method*/

controller.test = async (req, res, info) =>{
    console.log(info.title);
    res.send("upload!")
};

//
controller.addClip = async (req, res) =>{
    let result = [];
    let clip = Contents({
        clipInfo : [
            {
                title : req.file.originalname,
                duration : req.body.duration,
                fileName : req.file.filename,
                fileType : req.file.mimetype,
                fileSize : req.file.size,
                filePath : req.file.path
            }
        ],
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try{
        let addContent = await Contents.addClip(clip);
        logger.info('Adding content data ...');
        result.push({result : 'success', addContent});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.delClip = async (req, res)=>{
    let clipId = req.body.clipId;
    let result = [];
    try{
        let delContent = await Contents.delClip(clipId);
        logger.info('Deleting content...');
        result.push({result : 'success', delContent});
        res.send(result);
    }catch (e) {
        logger.error('Error occur deleting clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.editClip = async (req, res)=>{
    let category = req.body.category;
    let productName = req.body.productName;
    let amount = req.body.amount;
    let status = req.body.status;
    let tag = req.body.tag;
    let clipId = req.body.clipId;
    let download = req.body.download;
    let salesVol = req.body.salesVol;
    let result = [];
    try{
        let editContent = await Contents.editClip(category, productName, amount, status, tag, clipId, download, salesVol);
        logger.info('Editing content...');
        result.push({result : 'success', editContent});
        res.send(result);
    }catch (e) {
        logger.error('Error occur editing clip');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getUseableClips = async (req, res)=>{
    let result = [];
    try{
        let clips = await Contents.allUseClips();
        logger.info('All clip list');
        result.push({result : 'success', clips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.freeUseableClips = async (req, res)=>{
    let result = [];
    try{
        let freeClips = await Contents.freeUseClips();
        logger.info('Free clip list');
        result.push({result : 'success', freeClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.chargedUseableClips = async (req, res)=>{
    let result = [];
    try{
        let chargeClips = await Contents.chargeUseClips();
        logger.info('Free clip list');
        result.push({result : 'success', chargeClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free clip list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getClipInfo = async (req, res)=>{
    let clipId = req.body.clipId;
    console.log(clipId);
    let result = [];
    try{
        let clipInfo = await Contents.getClipInfo(clipId);
        logger.info('Get Clip Info : '+clipId);
        result.push({result: 'success', clipInfo});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting clip info : ' + clipId);
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

// - 사용/비사용 모두 보기
controller.getAllClips = async (req, res)=>{
    let result = [];
    try{
        let allClips = await Contents.getAllClips();
        logger.info('Get All Clips ');
        result.push({result : 'success', allClips});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all clip ');
        console.log(e);
        result.push({result : 'fail', message: 'e'});
        res.send(result);
    }
};





/* package contents method*/

controller.testPackages = async (req, res) =>{
    let sub = new Array();
    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.size,
            filePath : product.path
        })
    });
    let pack = Contents({
        subProduct : sub,
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try {
        let a = await Contents.testPack(pack);
        res.send(a);
    }catch (e) {
        res.send("error!")
    }
};

controller.addPackage = async (req, res) =>{
    let sub = new Array();
    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.size,
            filePath : product.path
        })
    });
    let result = [];
    let packages = Contents({
        subProduct : sub,
        type : req.body.type,
        category : req.body.category,
        tag : req.body.tag,
        productName : req.body.productName,
        amount : req.body.amount,
        salesVol : req.body.salesVol,
        download : req.body.download,
        status : req.body.status,
        regDate: req.body.regDate
    });
    try{
        let addPackage = await Contents.addPackage(packages);
        logger.info('Adding package data ...');
        result.push({result : 'success', addPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur adding package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.delPackage = async (req, res)=>{
    let packageId = req.body.packageId;
    let result = [];
    try{
        let delPackage= await Contents.delPackage(packageId);
        logger.info('Deleting package...');
        result.push({result : 'success', delPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur deleting package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getUsePackages = async (req, res)=>{
    let result = [];
    try{
        let packages = await Contents.allUsePackages();
        logger.info('All use package list');
        result.push({result : 'success', packages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all use package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getFreePackages = async (req, res)=>{
    let result = [];
    try{
        let freePackage = await Contents.freeUsePackages();
        logger.info('Free package list');
        result.push({result : 'success', freePackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getChargePackages = async (req, res)=>{
    let result = [];
    try{
        let chargePackages = await Contents.chargeUsePackages();
        logger.info('Free package list');
        result.push({result : 'success', chargePackages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting free package list');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

//
controller.getPackage = async (req, res)=>{
    let packageId = req.params.packageId;
    let result = [];
    try{
        let packageInfo = await Contents.getPackageInfo(packageId);
        logger.info('Get package Info : '+packageId);
        result.push({result: 'success', packageInfo});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting package info : ' + packageId);
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

// - 사용/비사용 모두 보기
controller.getAllPackages = async (req, res)=>{
    let result = [];
    try{
        let allPackages = await Contents.getAllPackages();
        logger.info('Get All Packages ');
        result.push({result : 'success', allPackages});
        res.send(result);
    }catch (e) {
        logger.error('Error occur getting all packages ');
        console.log(e);
        result.push({result : 'fail', message: 'e'});
        res.send(result);
    }
};


controller.editPackage = async (req, res)=>{
    let sub = new Array();
    req.body.subProduct.forEach(product =>{
        sub.push({
            title : product.title,
            duration : product.duration,
            fileName : product.fileName,
            fileType : product.fileType,
            fileSize : product.fileSize,
            filePath : product.filePath
        })
    });
    let category = req.body.category;
    let productName = req.body.productName;
    let amount = req.body.amount;
    let status = req.body.status;
    let tag = req.body.tag;
    let packageId = req.body.packageId;
    let subProduct = sub;
    let salesVol = req.body.salesVol;
    let download = req.body.download;
    let result = [];
    try{
        let editPackage = await Contents.editPackage(category, productName, amount, status, tag, packageId, subProduct, download, salesVol);
        logger.info('Editing package...');
        result.push({result : 'success', editPackage});
        res.send(result);
    }catch (e) {
        logger.error('Error occur editing package');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.getContents = async (req, res)=>{
    let result = [];
    let typeParam = req.body.type;
    let types;
    let chargedParam = req.body.charged;
    let charged;
    if(typeParam === 'single'){
        types = 'clip';
    }else if (typeParam === 'package') {
        types = 'package'
    }else {
        types = null;
    }

    if(chargedParam === 'yes'){
        charged = '$gt'
    }else if(chargedParam === 'no') {
        charged = '$eq'
    }else {
        charged = '$gte'
    }
    try{
        let contents = await Contents.getContents(types, charged);
        logger.info('Find contents - ');
        result.push({result : 'success', contents});
        res.send(result);
    }catch (e) {
        logger.error('Error occur finding contents');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};

controller.getUri = async (req, res)=>{
    let result = [];
    let clipId = req.body.clipId;
    try{
        let contents = await Contents.getUris(clipId);
        logger.info('Find uri - ');
        result.push({result : 'success', contents});
        res.send(result);
    }catch (e) {
        logger.error('Erro occur finding uri - ');
        console.log(e);
        result.push({result : 'fail', message : e});
        res.send(result);
    }
};
export default controller;
