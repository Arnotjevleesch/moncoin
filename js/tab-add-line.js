$(document).ready(function() {

	$("#tab_logic tbody tr:nth(0)").find("td span.row-remove").on("click", function() {
		if($("#tab_logic").rows.length > 2){
			$(this).closest("tr").remove();
		}
    });

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

			if ($(this).data("name") !== undefined) {
				var td = $("<td></td>", {
					"data-name": $(cur_td).data("name")
				});
				var html = cur_td.html();
				var new_html = html.replace($(cur_td).data("name") + "0" , $(cur_td).data("name") + newid);

				if ($($(this).children()[0]).data("toggle")) {
					new_html = "<input type='checkbox' checked data-toggle='toggle'" + 
						" name='" + $(cur_td).data("name") + newid + "'" +
						" data-on=\"" + $($($(this).children()[0]).children()[0]).data("on") + "\"" +
						" data-off=\"" + $($($(this).children()[0]).children()[0]).data("off") + "\" >";
				} 

				$(new_html).appendTo($(td));
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

		$(tr).find("[data-toggle=toggle]").bootstrapToggle();
	});

	cron_example1 = new CronUI('#cron0', {
    	initial: "42 3 * * 5",
	});


});

