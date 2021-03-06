'use strict';

/*

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

  (Это свободная программа: вы можете перераспространять ее и/или изменять
   ее на условиях Стандартной общественной лицензии GNU в том виде, в каком
   она была опубликована Фондом свободного программного обеспечения; либо
   версии 3 лицензии, либо (по вашему выбору) любой более поздней версии.

   Эта программа распространяется в надежде, что она будет полезной,
   но БЕЗО ВСЯКИХ ГАРАНТИЙ; даже без неявной гарантии ТОВАРНОГО ВИДА
   или ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННЫХ ЦЕЛЕЙ. Подробнее см. в Стандартной
   общественной лицензии GNU.

   Вы должны были получить копию Стандартной общественной лицензии GNU
   вместе с этой программой. Если это не так, см.
   <http://www.gnu.org/licenses/>.)
*/


Array.prototype.replaceUndefinedBy0=function(){
	var len=this.length;
	for(var i=0;i<len;i++)
		if(!this[i])
			this[i]=0;
};

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
	var baselen=base.length;
	for(var i=0;i<baselen-1;i++){
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

Array.prototype.delDublByProp=function(prop){
/**Удаление элементов массива, у которых свойства из массива строк prop совпадают с ранее рассмотренными.*/
	this.sortBy(prop);
	prop=prop.reverse();
	var len=this.length;
	var p=prop.length;
	for(var i=1;i<len;i++){
		if(!compareObjects(this[i-1],this[i],prop)){
			this.splice(i,1);
			len--;
			i--;
		}
	}
	return this;
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
	base.delDublByProp(['den','para','chzn','aud','grp','prep']);
	console.log('prepareBase():'+(new Date().getTime()-starttime));
}

function countTable(zagol,p1,p2,target,ugolnazv,nolist){
	var start=new Date().getTime();
	nolist || (nolist={});
	var extLeftColumns=2;
	var extTopRows=1;
	var targetTable=document.createElement("table");
	var groups=base.getVariety(zagol);
	if(groups[0])
		while(groups[0].search(/^\?|^-|[1-9]_[\-?]/)!=-1)
			groups=groups.concat(groups.splice(0,1));
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
	var det6p=['',''];
	for(var gi=0;gi<kolvoGroups;gi++){
		groupsindex[groups[gi]]=gi;
		nagr [gi+extLeftColumns]=0;
		det6p[gi]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	}

	var kolvoBase=base.length;
	var baseElem;
	var g;
	var mat;
	var yach, nyach;
	
	for(var j=0;j<kolvoBase;j++){
		baseElem=base[j];
		for(g=0;g<baseElem[zagol].length;g++){
			mat=baseElem[zagol][g].match(/^.*?(?=_)/);
			mat=mat?mat[0]:'';
			if(!nolist[mat]){
				nyach=groupsindex[baseElem[zagol][g]]+extLeftColumns;
				yach=(baseElem.den*kolvoParVDen+baseElem.para)*2+baseElem.chzn%2;
				maintable[yach][nyach];
				if(!maintable[yach][nyach] && groupsindex[baseElem[zagol][g]]+extLeftColumns && baseElem.predm!='НИР'){
					nagr [groupsindex[baseElem[zagol][g]]+extLeftColumns]++;
					det6p[groupsindex[baseElem[zagol][g]]][baseElem.den*2+baseElem.chzn%2]++;
				}
				maintable[yach][nyach]=baseElem.predm+' '+baseElem[p1]+' '+baseElem[p2];
				otobrStroki[baseElem.den*kolvoParVDen+baseElem.para]=1;
			}
		}

	}
	console.log('countTable() - осн. цикл:'+(new Date().getTime()-start));
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
			checksToAppend+=
				(''.vTag('input',
				'type="checkbox" '+'checked'.esli(!globalNolist[facult[fi]])+' onclick="waitfor(build);" class="check-nolist" id="'+
				facult[fi]+'"')+facult[fi].vTag('span',' onclick="checkOnly(\''+zagol+'\',\''+facult[fi]+'\');"')
				).vTag('span','title="'+podskaz[facult[fi]]+'"');
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
	for(var i=0;i<kolvoPar;i++){
		for(var j=0;j<kolvoGroups+extLeftColumns;j++)
			if(tablemap[i][j].innerHTML===''){
				tablemap[i][j].innerHTML='&nbsp;';
				tablemap[i][j].className="empty";
			}
	}

	for(var i=0;i<kolvoPar;i++){
		var elemPerv=0;
		for(var j=1+extLeftColumns;j<kolvoGroups+extLeftColumns;j++){
			if(tablemap[i][j].innerHTML==tablemap[i][j-1].innerHTML && tablemap[i][j].innerHTML!='&nbsp;'){
				if(elemPerv===0){
					elemPerv=tablemap[i][j-1];
					elemPerv.setAttribute("colspan",1);
				}
				elemPerv.setAttribute("colspan",1*elemPerv.getAttribute("colspan")+1);
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
			tablemap[i][0].setAttribute("rowspan",2*(kolvoParVDen-rowspandni[i/2/kolvoParVDen]));
			if(i)
				tablemap[i][0].parentElement.className+='para_8-00';
		}
	}
	$('#'+target)[0].appendChild(targetTable);

	//Считаем, у кого 6 пар
	var suml=dni.length*2;
	var par6='';
	for(var gi=0;gi<kolvoGroups;gi++){
		for(var i=0;i<suml;i++){
			if(det6p[gi][i]>=6){
				if(!(i%2) && det6p[gi][i+1]>=6){ 
					par6+="\n"+groups[gi]+' - '+dni[(i/2).floor()];
					i++;
				}
				else
					par6+="\n"+groups[gi]+' - '+dni[(i/2).floor()]+' ('+['числ','знам'][i%2]+'.)';
			}
		}
	}
	console.log(par6);
	console.log('countTable():'+(new Date().getTime()-start));
	
}

var globalNolist=$.jStorage.get('globalNolist',defaultNolist);

function saveInBackground(){
	var starttime=new Date().getTime();
	var checksNolist=document.getElementsByClassName('check-nolist');
	for(var ci=0;ci<checksNolist.length;ci++){
		$(checksNolist[ci]).prop("checked",!globalNolist[checksNolist[ci].id]);
	}
	baseSave();
	$.jStorage.set('globalNolist',globalNolist);
	$.jStorage.set("base",base);
//	$.jStorage.set("base"+(new Date().getDate()/1000000),base);
	console.log('saveInBackground():'+(new Date().getTime()-starttime));
}

function nonjqplotBarRender(target,uroven,ticks,ymin){
	var newticks=ticks.slice().map(function(elem,index){
		return '<br/>'.esli(index%2)+elem;
	});
	uroven.NaNtoUndefined();
	uroven.replaceUndefinedBy0();
	target=$('#'+target);
	target[0].height="400";
	target.css("height","400px");
	var mdata=[];
	for(var i=0;i<uroven.length;i++){
		mdata[i]=[uroven[i],{label:newticks[i]}];
	}
	target.tufteBar({
		data: mdata,
		barWidth: 0.5, 

		barLabel:  function(index) { 
		  return uroven[index]; 
		}, 

		axisLabel: function(index) { return this[1].label }, 

		color:     function(index) { 
		  return ['#E57536', '#82293B'][index % 2] 
		},
	});

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

function safeinc(obj,prop,n){
	if(n===undefined)
		n=1;
	if(!obj[prop])
		obj[prop]=n;
	else
		obj[prop]+=n;
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

function baseSaveEdited(){
	var bset=new Date().getTime();
	
	var len=$('#edit-target > tr').length;
	for(var i=0;i<len;i++){
		if(document.getElementById('den'  +i))
			setProps(base[i],{
				den  :1*document.getElementById('den'  +i).value,
				para :1*document.getElementById('para' +i).value,
				chzn :1*document.getElementById('chzn' +i).value,
				aud  :document.getElementById('aud'  +i).value.split(','),
				grp  :document.getElementById('grp'  +i).value.split(','),
				prep :document.getElementById('prep' +i).value.split(','),
				predm:document.getElementById('predm'+i).value,
			});
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
	var notonlyconflicts=!$('#edit-only-conflicts').is(':checked');
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
		if(notonlyconflicts || conflicts[i-1].length)
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
	nowait();
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

function uniteGrp(){
	var baselen=base.length-1;
	for(var i=0;i<baselen;i++){
		if(!compareObjects(base[i],base[i+1],['den','para','chzn','aud','prep','predm'])){
			base[i].grp=base[i].grp.concat(base[i+1].grp).sortDelDubl();
			base.splice(i+1,1);
			baselen--;
		}
	}
	build();
}

function checkOnly(abst,name){
	$('#div-checks-'+abst+' > span > input').prop("checked",0);
	$('#'+name).prop("checked",1);
	waitfor(build);
}


function vyborParPoMaske(){
	var mask=$('#input-mask').val();
	var maskbase='';
	var baselen=base.length;
	for(var i=0; i<baselen; i++){
		var tj=JSON.stringify(base[i]);
		if(tj.search(mask)!=-1)
			maskbase+=','+tj;
	}
	var blob = new Blob(['['+maskbase.replace(/},{/g,"},\r\n{").replace(/^,/,'')+']'], {
		type: "text/plain;charset=utf-8"
	});
	var a = document.createElement('a');
	a.download = mask+".json";
	a.href = URL.createObjectURL(blob);
	a.innerHTML = "<button>Сохранить</button>";
	document.getElementById('span-mask').innerHTML='';
	document.getElementById('span-mask').appendChild(a);
}

function nowait(){
	$('#pleasewait').hide();
}

function waitfor(fun){
	$('#pleasewait').show();
	setTimeout(fun,100);
}
