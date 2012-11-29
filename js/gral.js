var outputDir = 'output/';

(function($) {
	/*
	 * Function: fnGetColumnData Purpose: Return an array of table values from a
	 * particular column. Returns: array string: 1d data array Inputs:
	 * object:oSettings - dataTable settings object. This is always the last
	 * argument past to the function int:iColumn - the id of the column to
	 * extract the data from bool:bUnique - optional - if set to false
	 * duplicated values are not filtered out bool:bFiltered - optional - if set
	 * to false all the table data is used (not only the filtered)
	 * bool:bIgnoreEmpty - optional - if set to false empty values are not
	 * filtered from the result array Author: Benedikt Forchhammer
	 * <b.forchhammer /AT\ mind2.de>
	 */
	$.fn.dataTableExt.oApi.fnGetColumnData = function(oSettings, iColumn,
			bUnique, bFiltered, bIgnoreEmpty) {
		// check that we have a column id
		if (typeof iColumn == "undefined")
			return new Array();

		// by default we only want unique data
		if (typeof bUnique == "undefined")
			bUnique = true;

		// by default we do want to only look at filtered data
		if (typeof bFiltered == "undefined")
			bFiltered = true;

		// by default we do not want to include empty values
		if (typeof bIgnoreEmpty == "undefined")
			bIgnoreEmpty = true;

		// list of rows which we're going to loop through
		var aiRows;

		// use only filtered rows
		if (bFiltered == true)
			aiRows = oSettings.aiDisplay;
		// use all rows
		else
			aiRows = oSettings.aiDisplayMaster; // all row numbers

		// set up data array
		var asResultData = new Array();

		for ( var i = 0, c = aiRows.length; i < c; i++) {
			iRow = aiRows[i];
			var aData = this.fnGetData(iRow);
			var sValue = aData[iColumn];

			// ignore empty values?
			if (bIgnoreEmpty == true && sValue.length == 0)
				continue;

			// ignore unique values?
			else if (bUnique == true
					&& jQuery.inArray(sValue, asResultData) > -1)
				continue;

			// else push the value onto the result data array
			else
				asResultData.push(sValue);
		}
		return asResultData;

	}
}(jQuery));

function fnCreateSelect(aData, name) {
	var r = '<select id="sel_' + name + '"><option value=""></option>';
	for ( var i = 0; i < aData.length; i++) {
		if (aData[i].length > 50) {
			r = r + '<option value="' + aData[i] + '" title="' + aData[i]
					+ '">' + aData[i].substring(0, 50) + '...</option>';
		} else {
			r = r + '<option value="' + aData[i] + '">' + aData[i]
					+ '</option>';
		}
	}
	r = r + '</select>';
	return r;
}

function addTFoot(oTable) {
	/* Add a select menu for each TH element in the table footer */
	$("tfoot th").each(
			function(i) {
				if (this.innerHTML != ''
						&& this.innerHTML.substr(0, 8) != '<select ') {
					var name = this.innerHTML;
					this.innerHTML = fnCreateSelect(oTable
							.fnGetColumnData(this.innerHTML), name);
					this.setAttribute("id", name)
					$('select', this).change(function() {
						oTable.fnFilter($(this).val(), i);
					});
					$('select option', this).sort(NASort).appendTo(
							$('select', this));
					$('select', this).val('');
				} else if (this.innerHTML.substr(0, 8) == '<select '
						&& this.getAttribute("id")) {
					var name = this.getAttribute("id");
					this.innerHTML = fnCreateSelect(oTable
							.fnGetColumnData(name), name);
					$('select', this).change(function() {
						oTable.fnFilter($(this).val(), i);
					});
					$('select option', this).sort(NASort).appendTo(
							$('select', this));
					$('select', this).val('');
				}
			});
}

function NASort(a, b) {
	if (a.innerHTML == '') {
		return -1;
	} else if (b.innerHTML == '') {
		return 1;
	}
	return (a.innerHTML > b.innerHTML) ? 1 : -1;
};

$.urlParam = function(key) {
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
	return decodeURIComponent(result && result[1] || "");
}

function miRender(data, type, full) {
	if (type == 'display') {
		if (data) {
			if (data.length > 50) {
				return data.substring(0, 50) + '<a href="#" title="' + data
						+ '">...</a>';
			}
		}
	}
	return data;
}

$(window).load(function() {
	$('#dvLoading').fadeOut(2000);
});


function ini(){
	$("ul.sf-menu").superfish(); 
	$("#menu").load("menu.html");
	if ($("#datepicker")){
		$("#datepicker").datepicker({ dateFormat: 'dd/mm/yy', 
			 
			maxDate: new Date(2050, 1, 1), 
			minDate: new Date(2000, 1, 1), 
			dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
			monthNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
			changeMonth: true,
			changeYear: true
		});
	}
	$.ajax({
		url : outputDir + 'version',
		dataType : "text",
		success : function (data){
			$('#versionServer').text(data);
		},
		error : function (data){
			alert ('Error: No puedo leer archivo de versión');
		}
	});
}
