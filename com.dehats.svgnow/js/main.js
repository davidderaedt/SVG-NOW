/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';

    var csInterface = new CSInterface();
    
    
    function init() {
                
        themeManager.init();
                
        $("#btn_test").click(function () {


            var openResult = window.cep.fs.showOpenDialog(false, true, 'choose destination folder', null);
            console.log(openResult.data);
            var destFolderPath = openResult.data[0];

            var outlineFonts = $('#outlineFontsCb').is(':checked');

            var cssLoc = 1; 
            if($('#convertStylesToAttrsCb').is(':checked')) cssLoc = 0;

            var methcall = 'exportToSVG("' + destFolderPath + '", ' + outlineFonts + ', ' + cssLoc + ');'
            console.log("Calling --" +methcall);

            csInterface.evalScript(methcall, function(docName){

                console.log("Source SVG done for " + docName); 

                var filepath = destFolderPath + "/" + docName + ".svg";   
                var destFilePath =  destFolderPath + "/" + docName + "-opt.svg";  

                var pluginConfig = [                
                    {cleanupAttrs: $('#cleanupAttrsCb').is(':checked')},
                    {removeDoctype : $('#removeDoctypeCb').is(':checked')},
                    {removeXMLProcInst : $('#removeXMLProcInstCb').is(':checked')},
                    {removeComments : $('#removeCommentsCb').is(':checked')},
                    {removeMetadata : $('#removeMetadataCb').is(':checked')},
                    {removeTitle : $('#removeTitleCb').is(':checked')},
                    {removeDesc : $('#removeDescCb').is(':checked')},
                    {removeEditorsNSData : $('#removeEditorsNSDataCb').is(':checked')},
                    {removeEmptyAttrs : $('#removeEmptyAttrsCb').is(':checked')},
                    {removeHiddenElems : $('#removeHiddenElemsCb').is(':checked')},
                    {removeEmptyText : $('#removeEmptyTextCb').is(':checked')},
                    {removeEmptyContainers : $('#removeEmptyContainersCb').is(':checked')},
                    {removeViewBox : $('#removeViewBoxCb').is(':checked')},
                    {cleanupEnableBackground : $('#cleanupEnableBackgroundCb').is(':checked')},
                    {convertStyleToAttrs: $('#convertStyleToAttrsCb').is(':checked')},
                    {convertColors : $('#convertColorsCb').is(':checked')},
                    {convertPathData: $('#convertPathDataCb').is(':checked')},                    
                    {convertTransform : $('#convertTransformCb').is(':checked')},                    
                    {removeUnknownsAndDefaults : $('#removeUnknownsAndDefaultsCb').is(':checked')},                    
                    {removeNonInheritableGroupAttrs : $('#removeNonInheritableGroupAttrsCb').is(':checked')},                    
                    {removeUselessStrokeAndFill : $('#removeUselessStrokeAndFillCb').is(':checked')},                    
                    {removeUnusedNS : $('#removeUnusedNSCb').is(':checked')},                    
                    {cleanupIDs : $('#cleanupIDsCb').is(':checked')},                    
                    {cleanupNumericValues : $('#cleanupNumericValuesCb').is(':checked')},                    
                    {moveElemsAttrsToGroup : $('#moveElemsAttrsToGroupCb').is(':checked')},                    
                    {moveGroupAttrsToElems : $('#moveGroupAttrsToElemsCb').is(':checked')},                    
                    {collapseGroups : $('#collapseGroupsCb').is(':checked')},                    
                    {removeRasterImages : $('#removeRasterImagesCb').is(':checked')},                    
                    {mergePaths : $('#mergePathsCb').is(':checked')},                    
                    {convertShapeToPath : $('#convertShapeToPathCb').is(':checked')},                    
                    {sortAttrs : $('#sortAttrsCb').is(':checked')},                    
                    {transformsWithOnePath : $('#transformsWithOnePathCb').is(':checked')},                    
                ];


                console.log("Plugin config ", pluginConfig); 

                var FS = require('fs'),
                    PATH = require('path'),
                    SVGO = require('svgo'),
                    svgo = new SVGO( { plugins:pluginConfig } );
                    

                FS.readFile(filepath, 'utf8', function(err, data) {

                    if (err) {
                        throw err;
                    }

                    svgo.optimize(data, function(result) {

                        console.log(result);
                         FS.writeFile(destFilePath, result.data, function(err) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log("Optimized SVG Done!");
                                }
                            });                     

                    });
                       

                });

            });




        });

    }
        
    init();

}());
    
