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
                    {convertPathData: $('#convertPathDataCb').is(':checked')},
                    {convertStyleToAttrs: false},
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
    
