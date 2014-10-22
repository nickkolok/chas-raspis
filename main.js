'use strict';

Array.prototype.replaceUndefinedBy0=function(){
	var len=this.length;
	for(var i=0;i<len;i++)
		if(!this[i])
			this[i]=0;
}

function makeSelect(opts,vals,selected,id){
	var rez='';
	var len=opts.length;
	for(var i=0;i<len;i++){
		rez+='<option value="'+vals[i]+'"'+'selected'.esli(i==selected)+'>'+opts[i]+'</option>';
	}
	return rez.vTag('select','id="'+id+'"');
}

function makeInput(val,id,name){
	return '<input autocomplete="on" id="'+id+'" name="'+name+'" value="'+val+'"/>';
}

function findConflicts(p1,p2,p3){
	var start=new Date().getTime();
	var kolvoPar=pary.length;
	var kolvoDni=dni.length;
//	prepareBase();
	var baselen=base.length;
	for(var i=0;i<baselen-1;i++){
//		for(var j=i+1;j<baselen && !compareObjects(base[i],base[j],['den','para','chzn']);j++){
		for(var j=i+1; j<baselen && base[i].chzn==base[j].chzn ; j++){
			var a=base[i];
			var b=base[j];
			if(
				(a.aud[0].length>1 && a.aud.hasCommon(b.aud))+
				(a.prep[0].length>1 && a.prep.hasCommon(b.prep))+
				(a.grp[0].length>1 && a.grp.hasCommon(b.grp))+
				(a.predm==b.predm)
				>1
			){	
				conflicts[i].push(j);
				conflicts[j].push(i);
			}
		}
	}
	console.log('findConflicts():'+(new Date().getTime()-start));
}

function prepareBase(){
	var starttime=new Date().getTime();
	var baselen=base.length;
	var baseelem;
	var dubl;
	for(var i=0;i<baselen;i++){
		conflicts[i]=[];
		baseelem=base[i];
		if(baseelem.aud=='' || baseelem.grp=='' || baseelem.prep==''){
			base.splice(i,1);
			baselen--;
			i--;
			continue;
		}
		//{{Костыль
			baseelem.aud.delEmpty();
			baseelem.grp.delEmpty();
			baseelem.prep.delEmpty();
			baseelem.aud.trimStrings();
			baseelem.grp.trimStrings();
			baseelem.prep.trimStrings();
		//}}Костыль
		if(baseelem.chzn==2){
			baseelem.chzn=0;
			dubl=baseelem.clone();
			dubl.chzn=1;
			base.push(dubl);
		}
	}
	base=base.delDublByProp(['den','para','chzn','aud','grp','prep']);
	console.log('prepareBase():'+(new Date().getTime()-starttime));
}

function countTable(zagol,p1,p2,target,ugolnazv,nolist){
	var start=new Date().getTime();
	nolist || (nolist={});
	var extLeftColumns=2;
	var extTopRows=1;
	var targetTable=document.createElement("table");
	var groups=base.getVariety(zagol);
	var groupsEtal=groups.slice();
	var vlen=groups.length;
	for(var vi=0;vi<vlen;vi++){
		var rez=groups[vi].match(/^.*?(?=_)/);
		if(!rez && groups[vi]!='-' && groups[vi]!='?')
			console.log(groups[vi]);
		if((!rez  || nolist[rez[0]]) && groups[vi]!='-' && groups[vi]!='?'){
			groups.splice(vi,1);
			vi--;
			vlen--;
		}
	}
	var th=(''.vTag('th')+ugolnazv.vTag('th')+groups.join('</th><th>').vTag('th')).vTag('tr');
	var maintable=[];
	var kolvoParVDen=pary.length;
	var kolvoPar=kolvoParVDen*dni.length*2;
	var kolvoGroups=groups.length;
	var otobrStroki=[];
	for(var i=0;i<kolvoPar;i++){
		maintable[i]=[
			!(i%(2*kolvoParVDen))  ?  dni[i/(2*kolvoParVDen)].split('').join('<br/>')  :'',
			pary[((i-1)/2).round()%kolvoParVDen].bold(),
		];
		maintable[i].length=kolvoGroups+extLeftColumns;
	}
	var groupsindex={};
	var nagr=['','Нагрузка, ч/нед'];
	for(var gi=0;gi<kolvoGroups;gi++){
		groupsindex[groups[gi]]=gi;
		nagr[gi+extLeftColumns]=0;
	}

	var kolvoBase=base.length;
	var baseElem;
	for(var j=0;j<kolvoBase;j++){
		baseElem=base[j];
		for(var g=0;g<baseElem.grp.length;g++){
			var mat=baseElem.grp[g].match(/^.*?(?=_)/);
			mat=mat?mat[0]:'';
			if(!nolist[mat]){
				maintable[(baseElem.den*kolvoParVDen+baseElem.para)*2+baseElem.chzn%2]
					[groupsindex[baseElem[zagol][g]]+extLeftColumns]=
					[baseElem.predm,baseElem[p1],baseElem[p2]].join(' ');
				nagr[groupsindex[baseElem[zagol][g]]+extLeftColumns]++;
				otobrStroki[baseElem.den*kolvoParVDen+baseElem.para]=1;
			}
		}

	}
	var maintableCopy=maintable.clone();
	for(var itr=0;itr<kolvoPar;itr++){
		maintable[itr]=maintable[itr].join('</td><td>').vTag('td');
	}


	//Вот здесь и дальше работаем с DOM

	if(!$('#div-checks-'+zagol)[0]){
		var facult=groupsEtal.map(function(p1){
			var rez=p1.match(/^.*?(?=_)/);
			return rez?rez[0]:"";
		});
		facult.delEmpty();
		facult=facult.sortDelDubl();


		var checksToAppend='';
		for(var fi=0,flen=facult.length;fi<flen;fi++){
			checksToAppend+=(facult[fi]).vTag('input',
				'type="checkbox" '+'checked'.esli(!globalNolist[facult[fi]])+' onclick="build()" class="check-nolist" id="'+facult[fi]+'"');
		}
		var divChecks=document.createElement('div');
		divChecks.innerHTML=checksToAppend;
		divChecks.id='div-checks-'+zagol;
		$('#'+target)[0].appendChild(divChecks);
	}
	var ih=maintable.join('</tr><tr>').vTag('tr');
	targetTable.innerHTML=th+ih+nagr.join('</td><td>').vTag('td').vTag('tr');

	$(targetTable).attr("cellspacing",0);
	$(targetTable).attr("cellpadding",0);

	var tablemap=[];
	var trs=targetTable.getElementsByTagName('tr');
	for(var i=0;i<kolvoPar;i++){
		tablemap[i]=trs[i+extTopRows].getElementsByTagName('td');
	}

	//Затыкаем пустые ячейки неразрывными пробелами
	for(var i=0;i<kolvoPar;i++)
		for(var j=0;j<kolvoGroups+extLeftColumns;j++)
			if(tablemap[i][j].innerHTML===''){
				tablemap[i][j].innerHTML='&nbsp;';
				tablemap[i][j].className="empty";
			}

	for(var i=0;i<kolvoPar;i++){
		var elemPerv=0;
		for(var j=1+extLeftColumns;j<kolvoGroups+extLeftColumns;j++){
			if(tablemap[i][j].innerHTML==tablemap[i][j-1].innerHTML && tablemap[i][j].innerHTML!='&nbsp;'){
				if(elemPerv===0){
					elemPerv=tablemap[i][j-1];
					elemPerv.setAttribute("colspan",1);
				}
				elemPerv.setAttribute("colspan",1*$(elemPerv).attr("colspan")+1);
				tablemap[i][j].style.display="none";
			}else{
				elemPerv=0;
			}
		}
	}
	var rowspandni=[].zapslch(0,dni.length,0);

	for(var i=0;i<kolvoPar;i+=2){
		for(var j=extLeftColumns-1;j<kolvoGroups+extLeftColumns;j++){
			if(tablemap[i][j].innerHTML==tablemap[i+1][j].innerHTML &&
				tablemap[i][j].getAttribute('colspan')==tablemap[i+1][j].getAttribute('colspan') &&
				tablemap[i][j].style.display!='none' && tablemap[i+1][j].style.display!='none'
			){
				tablemap[i][j].setAttribute("rowspan","2");
				tablemap[i+1][j].style.display="none";
			}
		}	
		if(otobrStroki[(i/2).floor()]===undefined && i%(2*kolvoParVDen) && (i+1)%(2*kolvoParVDen) ){
//			tablemap[i][1].parentNode.style.backgroundColor="pink";
//			tablemap[i+1][1].parentNode.style.backgroundColor="pink";
			tablemap[i][1].parentNode.style.display="none";
			tablemap[i+1][1].parentNode.style.display="none";
			safeinc(rowspandni,(i/2/kolvoParVDen).floor());
//			tablemap[i][1].parentNode.style.height="0px";
//			tablemap[i][1].parentNode.style.overflow="hidden";
//			tablemap[i+1][1].parentNode.style.height="0px";
//			tablemap[i+1][1].parentNode.style.overflow="hidden";
		}
	}
	for(var i=0;i<kolvoPar;i++){
		if(i%(2*kolvoParVDen)){
			tablemap[i][0].style.display='none';
		}else{
			$(tablemap[i][0]).attr("rowspan",2*(kolvoParVDen-rowspandni[i/2/kolvoParVDen]));
			if(i)
				tablemap[i][0].parentElement.className+='para_8-00';
		}
	}
	$('#'+target)[0].appendChild(targetTable);
	console.log('countTable():'+(new Date().getTime()-start));
	
}

var globalNolist=$.jStorage.get('globalNolist',{});

function build(){
	var start=new Date().getTime();
	var checksNolist=document.getElementsByClassName('check-nolist');
	for(var ci=0;ci<checksNolist.length;ci++){
		globalNolist[checksNolist[ci].id]=!$(checksNolist[ci]).is(':checked');
	}
	$('#targetGroups')[0].innerHTML='';
	$('#targetAud')[0].innerHTML='';
	prepareBase();
	countTable("grp","prep","aud",'targetGroups','Группа',globalNolist);
	countTable("aud","prep","grp",'targetAud','Аудитория',globalNolist);
	preBuildEdit();
	setTimeout(saveInBackground,10);
	console.log('build():'+(new Date().getTime()-start));
}

function saveInBackground(){
	var starttime=new Date().getTime();
	var checksNolist=document.getElementsByClassName('check-nolist');
	for(var ci=0;ci<checksNolist.length;ci++){
		$(checksNolist[ci]).prop("checked",!globalNolist[checksNolist[ci].id]);
	}
	baseSave();
	$.jStorage.set('globalNolist',globalNolist);
	$.jStorage.set("base",base);
	$.jStorage.set("base"+(new Date().getDate()/1000000),base);
	console.log('saveInBackground():'+(new Date().getTime()-starttime));
}

function nonjqplotBarRender(target,uroven,ticks,ymin){
	var newticks=ticks.slice().map(function(elem,index){
		return '<br/>'.esli(index%2)+elem;
	});
	uroven.replaceUndefinedBy0();
	target=$('#'+target);
	target[0].height="400";
	target.css("height","400px");
	var mdata=[];
	for(var i=0;i<uroven.length;i++){
		mdata[i]=[uroven[i],{label:newticks[i]}];
	}
//	console.log(mdata);
	target.tufteBar({
    data: mdata,/*[
      // First element is the y-value
      // Other elements are arbitary - they are not used by the lib
      // but are passed back into callback functions
      [1.0, {label: 'Dog'}],
      [1.3, {label: 'Raccoon'}],
      // etc...
*//*
      // For stacked graphs, pass an array of non-cumulative y values
      [[1.5, 1.0, 0.51], {label: '2005'}]
    ],

    // Any of the following properties can be either static values 
    // or a function that will be called for each data point. 
    // For functions, 'this' will be set to the current data element, 
    // just like jQuery's $.each

*/    // Bar width in arbitrary units, 1.0 means the bars will be snuggled
    // up next to each other
    barWidth: 0.5, 

/*    // The label on top of the bar - can contain HTML
    // formatNumber inserts commas as thousands separators in a number
  */  barLabel:  function(index) { 
      return uroven[index]; 
    }, 

    // The label on the x-axis - can contain HTML
    axisLabel: function(index) { return this[1].label }, 

    // The color of the bar
    color:     function(index) { 
      return ['#E57536', '#82293B'][index % 2] 
    },
 /*
    // Legend is optional
    legend: {
      // Data can be an array of any type of object, but the default
      // formatter works with strings
      data: ["North", "East", "West"],

      // By default, the colors of the graph are used
      color: function(index) { 
        return ['#E57536', '#82293B'][index % 2] 
      },

      // You can customize the element label - can contain HTML
      label: function(index) { return this }
    }
*/  });

}


function jqplotBarRender(target,uroven,ticks,ymin){
	var newticks=ticks.slice().map(function(elem,index){
		return '<br/>'.esli(index%2)+elem;
	});
	$.jqplot(target, [uroven],{
			axes:{
				xaxis:{
					ticks:newticks,
					renderer:$.jqplot.CategoryAxisRenderer,
				},
				yaxis:{
					min:ymin,
				}
			},
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: { barMargin: 15 },
//				shadow:false,
			},
			grid:{
//				shadow:false,
			},
		}
	);
}

function diagr(){
	$('.jqplot-target').html('');
	prepareBase();
	var baselen=base.length;
	var kolvoDni=dni.length;
	var statdni=[];
	var statpary=[];
	var stataud={};
	var baseelem;

	var statpodnyam=[], statpodnyammas=[];
	for(var i=0;i<kolvoDni;i++){
		statpodnyam[i]=[];
		statpodnyammas[i]=[];
	}
	var korp={};
	var korpval=$('#select-korpusa').val();
	for(var i=0;i<korpval.length;i++){
		korp[korpval[i]]=1;
	}
	for(var i=0;i<baselen;i++){
		baseelem=base[i];
		for(var j=0;j<baseelem.aud.length;j++){
			var fl_korp=0;
			var k=baseelem.aud[j].match(/.*(?=_)/g);
			if(!k)
				k=['1'];
			if(korp[k[0]]){
				fl_korp=1;
			}
			if(fl_korp){
				safeinc(stataud,baseelem.aud[j] );
				safeinc(statpodnyam[baseelem.den],baseelem.aud[j] );
			}
		}
		if(fl_korp){
			safeinc(statpary,baseelem.para);
			safeinc(statdni ,baseelem.den );
		}
	}

	var stataudmas=[];
	for(var chto in stataud){
		stataudmas.push([stataud[chto],chto]);
		for(var i=0;i<kolvoDni;i++){
			statpodnyammas[i].push([statpodnyam[i][chto],chto]);
		}
	}
	stataudmas=stataudmas.sortNumericArr();
	stataudmas=stataudmas.T();
	$('.jqplot-target-aud').css('width',stataudmas[0].length*50);
	
	jqplotBarRender('jqplot-pary',statpary,pary,0);
	jqplotBarRender('jqplot-dni' ,statdni ,dni ,0);
	nonjqplotBarRender('jqplot-aud' ,stataudmas[0],stataudmas[1],0);

	var podnyam=$('#jqplot-pary-po-dnyam')[0];
	for(var i=0;i<kolvoDni;i++){
		statpodnyammas[i][0].replaceUndefinedBy0();
		statpodnyammas[i]=statpodnyammas[i].sortNumericArr();
		statpodnyammas[i]=statpodnyammas[i].T();
		var h3=document.createElement('h3');
		h3.innerHTML=dni[i];
		podnyam.appendChild(h3);
		var targdiv=document.createElement('div');
		targdiv.id='jqplot-podnyam-'+dni[i];
		podnyam.appendChild(targdiv);
		nonjqplotBarRender('jqplot-podnyam-'+dni[i],statpodnyammas[i][0],statpodnyammas[i][1],0);
	}
}

function baseClean(){
	if(confirm('Вы действительно хотите очистить базу?')){
		base=[];
		build();
		$('.jqplot-target').html('');
	};
}

function baseLoad(){
	
	var readers=[];
	// Closure to capture the file information.
	var filelist=$('#file-load')[0].files;
	var f;
	for(var i=0;i<filelist.length;i++){
		readers[i] = new FileReader();
		f=filelist[i];
		readers[i].onload = (function(theFile) {
			return function(e) {
				try{
					base=base.concat(JSON.parse(e.target.result));
					build();
				}catch(e){
					alert('Не удалось импортировать базу из '+theFile.name)
				}
			};
		})(f);
		readers[i].readAsText(f);
	}
}

function baseSave(){
	var blob = new Blob([JSON.stringify(base).replace(/},{/g,"},\r\n{")], {
		type: "text/plain;charset=utf-8"
	});
	var a = document.createElement('a');
	a.download = "save.json";
	a.href = URL.createObjectURL(blob);
	a.innerHTML = "<button>Сохранить</button>";
	document.getElementById('span-save').innerHTML='';
	document.getElementById('span-save').appendChild(a);
}
base=base.concat($.jStorage.get("base",[]));
baseSave();

function baseSaveEdited(){
	var bset=new Date().getTime();
	
	var len=$('#edit-target > tr').length;
	for(var i=0;i<len;i++){
/*		setProps(base[i],{
			den  :1*$('#den'  +i).val(),
			para :1*$('#para' +i).val(),
			chzn :1*$('#chzn' +i).val(),
			aud  :$('#aud'  +i).val().split(','),
			grp  :$('#grp'  +i).val().split(','),
			prep :$('#prep' +i).val().split(','),
			predm:$('#predm'+i).val(),
		});*/
		setProps(base[i],{
			den  :1*document.getElementById('den'  +i).value,
			para :1*document.getElementById('para' +i).value,
			chzn :1*document.getElementById('chzn' +i).value,
			aud  :document.getElementById('aud'  +i).value.split(','),
			grp  :document.getElementById('grp'  +i).value.split(','),
			prep :document.getElementById('prep' +i).value.split(','),
			predm:document.getElementById('predm'+i).value,
		});

/*			base[i].den  =1*document.getElementById('den'  +i).value;
			base[i].para =1*document.getElementById('para' +i).value;
			base[i].chzn =1*document.getElementById('chzn' +i).value,
			base[i].aud  =document.getElementById('aud'  +i).value.split(',');
			base[i].grp  =document.getElementById('grp'  +i).value.split(',');
			base[i].prep =document.getElementById('prep' +i).value.split(',');
			base[i].predm=document.getElementById('predm'+i).value;
*/

	}
	console.log(new Date().getTime()-bset);
	build();
	console.log(new Date().getTime()-bset);
}

function baseDobav(){
	var bset=new Date().getTime();
	
	for(var i=0;i<kolvoDobav;i++){
		base.push({
			den  :1*document.getElementById('dobav-den'  +i).value,
			para :1*document.getElementById('dobav-para' +i).value,
			chzn :1*document.getElementById('dobav-chzn' +i).value,
			aud  :document.getElementById('dobav-aud'  +i).value.split(','),
			grp  :document.getElementById('dobav-grp'  +i).value.split(','),
			prep :document.getElementById('dobav-prep' +i).value.split(','),
			predm:document.getElementById('dobav-predm'+i).value,
		});
	}
	build();
	buildDobav();
	console.log(new Date().getTime()-bset);
}

function preBuildEdit(){
	$('#startbuild').show();
}

function buildEdit(){
	$('#startbuild').hide();
	findConflicts();
	var rez='';
	var elem;
	var commonVals=[0,1,2,3,4,5,6,7,8,9];
	var cz=['Числитель','Знаменатель','Не зависит'];
	base=[{
		den:0,
		para:0,
		chzn:0,
		aud:[''],
		grp:[''],
		prep:[''],
		predm:'',
	}].concat(base);
	var baselen=base.length;
	for(var i=0;i<baselen;i++){
		elem=base[i];
		rez+=[
			(''+i).vTag('span','id="yakor'+i+'"'),
			makeSelect(dni ,commonVals,elem.den ,"den" +i),
			makeSelect(pary,commonVals,elem.para,"para"+i),
			makeSelect(cz  ,commonVals,elem.chzn,"chzn"+i),
			makeInput(elem.aud,"aud"+i,"aud"),
			makeInput(elem.grp,"grp"+i,"grp"),
			makeInput(elem.prep,"prep"+i,"prep"),
			makeInput(elem.predm,"predm"+i,"predm"),
			conflicts[i-1].map(function(cnf){
				return '<a href="#yakor'+(cnf+1)+'" >№'+(cnf+1)+'</a>';
			}).join(','),
		].tr();	
	}
	$('#edit-target').html(rez.vTag('form'));
}

var kolvoDobav=22;

function buildDobav(){
	var rez='';
	var elem;
	var commonVals=[0,1,2,3,4,5,6,7,8,9];
	var cz=['Числитель','Знаменатель','Не зависит'];
	for(var i=0;i<kolvoDobav;i++){
		rez+=[
			(''+i).vTag('span','id="yakor-dopoln'+i+'"'),
			makeSelect(dni ,commonVals,2,"dobav-den" +i),
			makeSelect(pary,commonVals,2,"dobav-para"+i),
			makeSelect(cz  ,commonVals,2,"dobav-chzn"+i),
			makeInput('',"dobav-aud"+i,"aud"),
			makeInput('',"dobav-grp"+i,"grp"),
			makeInput('',"dobav-prep"+i,"prep"),
			makeInput('',"dobav-predm"+i,"predm"),
		].tr();	
	}
	$('#dobav-target').html(rez);
}

function createKorpusa(){
	var rez='';

	for(var i=0;i<korpusa.length;i++){
		rez+=korpusa[i].vTag('option','selected value="'+korpusa[i]+'"');
	}
	$('#select-korpusa').html(rez);
	$('#select-korpusa').attr('size',korpusa.length);
}
createKorpusa();

function correctAuto(){
	var basestring=JSON.stringify(base);
	var len=grpalias.length;
	for(var i=0;i<len;i++){
		basestring=basestring.replace(grpalias[i][0],grpalias[i][1]);
	}
	base=JSON.parse(basestring);
	build();
}

function correctPerechisl(){
	var baselen=base.length;
	for(var i=0;i<baselen;i++){
		var glen=base[i].grp.length;
		if(glen==1)
			continue;
		var mat=base[i].grp[0].match(/.*(?=_)/);
		mat=mat?mat[0]:'';
		for(var j=1; j<glen;j++){
			if(!base[i].grp[j].match(/.*(?=_)/)){
				base[i].grp[j]=mat+'_'+base[i].grp[j];
			}
		}
	}
	build();
}

$(function(){
	$("#tabs").tabs();
	build();
	buildDobav();
});
