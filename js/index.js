$(document).ready(function() {
    $("#add_row").click(function() {
        // Dynamic Rows Code
        
        // Get max row id and set new id
        var newid = 0;
        $.each($("#tab_logic tr"), function() {
            if (parseInt($(this).data("id")) > newid) {
                newid = parseInt($(this).data("id"));
            }
        });
        newid++;
        
        var tr = $("<tr></tr>", {
            id: "line"+newid,
            "data-id": newid
        });
        
        // loop through each td and create new elements with name of newid
        $.each($("#tab_logic tbody tr:nth(0) td"), function() {
            var cur_td = $(this);
            
				var children = cur_td.children();
				
				// add new td and element if it has a name
				if ($(this).data("name") !== undefined) {
					var td = $("<td></td>", {
						"data-name": $(cur_td).data("name")
					});
					
					var c = $(cur_td).find($(children[0]).prop('tagName')).clone().val("");
					c.attr("name", $(cur_td).data("name") + newid);
					
					if ($(c[1]).prop('className') != "toggle-group") {
						c.appendTo($(td));
					}
					
					td.appendTo($(tr));
				} else {
					var td = $("<td></td>", {
						'text': $('#tab_logic tr').length
					}).appendTo($(tr));
				}
        });
        
        // add the new row
        $(tr).appendTo($('#tab_logic'));
        
        $(tr).find("td span.row-remove").on("click", function() {
             $(this).closest("tr").remove();
        });
	});
});

/*
<td data-name="twitter">
	<div class="toggle btn btn-primary" data-toggle="toggle" style="width: 55px; height: 34px;">
		<input type="checkbox" checked="" data-toggle="toggle" name="twitter0" data-on="on" data-off="off">
		<div class="toggle-group">
			<label class="btn btn-primary toggle-on">on</label>
			<label class="btn btn-default active toggle-off">off</label>
			<span class="toggle-handle btn btn-default"></span>
		</div>
	</div>
</td>


<td data-name="twitter">
	<div class="toggle btn btn-primary" data-toggle="toggle" style="width: 55px; height: 34px;" name="twitter1">
		<input type="checkbox" checked="" data-toggle="toggle" name="twitter0" data-on="on" data-off="off">
		<div class="toggle-group">
			<label class="btn btn-primary toggle-on">on</label>
			<label class="btn btn-default active toggle-off">off</label>
			<span class="toggle-handle btn btn-default"></span>
		</div>
	</div>
	
	//laisse un twitter0 au dessus + bloc ajouté en doublon:
	
	<div class="toggle-group" name="twitter1">
		<label class="btn btn-primary toggle-on">on</label>
		<label class="btn btn-default active toggle-off">off</label>
		<span class="toggle-handle btn btn-default"></span>
	</div>
</td>
*/