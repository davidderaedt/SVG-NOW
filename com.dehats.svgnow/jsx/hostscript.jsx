/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/


function exportToSVG(destFolderPath, _outlineFonts, _cssPropLoc){

	var doc = app.activeDocument;
	
    var options = new ExportOptionsSVG();

    options.coordinatePrecision = 1;		
	options.embedRasterImages = true;

    options.fontType = SVGFontType.OUTLINEFONT;    
    if(_outlineFonts==false) {
        options.fontType = SVGFontType.SVGFONT;
        options.fontSubsetting = SVGFontSubsetting.None;
    }
    
    if(doc.variables.length>0) {
        options.includeVariablesAndDatasets = true;
    }
    
    var cssPropLoc = SVGCSSPropertyLocation.PRESENTATIONATTRIBUTES;
    if(_cssPropLoc == 1 ) cssPropLoc =SVGCSSPropertyLocation.STYLEELEMENTS;
    else if (_cssPropLoc == 2 ) cssPropLoc =SVGCSSPropertyLocation.STYLEATTRIBUTES;

    options.cssProperties = cssPropLoc;

    options.documentEncoding = SVGDocumentEncoding.UTF8;


    var extSepIndex = doc.name.lastIndexOf(".");
    var docName = doc.name.slice(0, extSepIndex);
	var destFilePath = destFolderPath + "/" + docName + ".svg";	
	var fileSpec = new File(destFilePath);
						   
	doc.exportFile( fileSpec, ExportType.SVG, options );

	return docName;

}
