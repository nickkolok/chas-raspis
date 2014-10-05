'use strict';

Array.prototype.getVariety=function(prop){
	var len=this.length;
	var rez=[];
	for(var i=0;i<len;i++){
		if(this[i][prop]!==undefined){
			if(this[i][prop].isArray){
				rez=rez.concat(this[i][prop]);
			}else{
				rez.push(this[i][prop]);
			}
		}
	}
	return rez.sortDelDubl();
}

String.prototype.multiply=function(n){
	var rez=this;
	for(var i=0;i<n;i++)
		rez+=this;
	return rez;
}

Array.prototype.sortBy=function(prop){
	return this.sort(function(a,b){
		return compareObjects(a,b,prop);
	});
	
}

function compareObjects(a,b,propList){
	var len=propList.length;
	for(var i=0;i<len;i++){
		if(a[propList[i]]<b[propList[i]])
			return -1;
		else if (a[propList[i]]>b[propList[i]])
			return 1;
	}
	return 0;
}

Array.prototype.delDublByProp=function(prop){
	var rez=this.slice();
	rez=rez.sortBy(prop);
	var len=rez.length;
	var p=prop.length;
	for(var i=1;i<len;i++){
		if(!compareObjects(rez[i-1],rez[i],prop)){
			rez.splice(i,1);
			len--;
		}
	}
	return rez;
}

Array.prototype.sortNumeric=function(){
	return this.sort(function(a,b){
		return a-b;
	});
}

Array.prototype.sortNumericArr=function(){
	return this.sort(function(a,b){
		return a[0]-b[0];
	});
}

function safeinc(obj,prop){
	if(!obj[prop])
		obj[prop]=1;
	else
		obj[prop]++;
}

function makeSelect(opts,vals,selected,id){
	var rez='';
	var len=opts.length;
	for(var i=0;i<len;i++){
		rez+='<option value="'+vals[i]+'"'+'selected'.esli(i==selected)+'>'+opts[i]+'</option>';
	}
	return rez.vTag('select','id="'+id+'"');
}

function makeInput(val,id){
	return '<input id="'+id+'" value="'+val+'"/>';
}

function setProps(obj,props){
	for(var chto in props){
		obj[chto]=props[chto];
	}
}

var base=[
	{den: 0, para: 1, chzn: 0, aud:["1_319"], grp:[1.1,1.2,1.3,2,3.1,3.2,3.3,4.1,4.2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 1, chzn: 1, aud:["1_325"], grp:[1.3,2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 2, chzn: 0, aud:["1а_480"], grp:[1.1,1.2], prep: ["Яреско"], predm: "Экономика"},
	{den: 0, para: 2, chzn: 2, aud:["1_315"], grp:[1.3,2], prep: ["Орешина"], predm: "Английский язык"},
	{den: 0, para: 3, chzn: 2, aud:["1_306"], grp:[1.1,1.2,1.3], prep: ["Завгородний"], predm: "Технологии программирования"},
	{den: 0, para: 4, chzn: 2, aud:["1_Спортзал","2_Борц. зал"], grp:[1.1,1.2,1.3,2,3.1,3.2,3.3,4.1,4.2], prep: ["Попов","Стрельникова"], predm: "Физкультура"},

	{den: 1, para: 2, chzn: 2, aud:["1_305"], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 1, para: 3, chzn: 2, aud:["1_305"], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 1, para: 3, chzn: 2, aud:["1_436"], grp:[1.2], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 1, para: 3, chzn: 2, aud:["1_227"], grp:[1.3], prep: ["Груздьев"], predm: "Диф. ур-я"},
	{den: 1, para: 4, chzn: 2, aud:["1_319"], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 1, para: 4, chzn: 2, aud:["1_436"], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 1, para: 4, chzn: 2, aud:["1_321"], grp:[1.3], prep: ["Бахтина"], predm: "Мат. анализ"},

	{den: 2, para: 0, chzn: 2, aud:["1_314"], grp:[1.1,1.2], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 0, chzn: 2, aud:["1_501П"], grp:[1.3], prep: ["Ушаков"], predm: "ТП"},
	{den: 2, para: 1, chzn: 2, aud:["1б_501П"], grp:[1.2], prep: ["Ушаков"], predm: "ТП"},
	{den: 2, para: 1, chzn: 0, aud:["1_359"], grp:[1.3], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 1, chzn: 1, aud:["1_365"], grp:[1.3], prep: ["Залыгаева"], predm: "Диф. геометрия"},
	{den: 2, para: 1, chzn: 0, aud:["1_310"], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 2, para: 1, chzn: 1, aud:["1_318"], grp:[1.1], prep: ["Леженина"], predm: "Диф. ур-я"},
	{den: 2, para: 2, chzn: 2, aud:["1_305"], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "Диф. ур-я"},

	{den: 3, para: 0, chzn: 2, aud:["1_333"], grp:[1.2], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 3, para: 1, chzn: 2, aud:["1_325"], grp:[1.1], prep: ["Кочетова"], predm: "Английский язык"},
	{den: 3, para: 1, chzn: 2, aud:["?"], grp:[1.2], prep: ["Орешина"], predm: "Английский язык"},
	{den: 3, para: 1, chzn: 2, aud:["1_333"], grp:[1.3], prep: ["Бахтина"], predm: "Мат. анализ"},
	{den: 3, para: 2, chzn: 2, aud:["1_430"], grp:[1.1,1.2,1.3], prep: ["Курина"], predm: "Мат. анализ"},
	{den: 3, para: 3, chzn: 2, aud:["1_305"], grp:[1.1,1.2,1.3], prep: ["Леженина"], predm: "фак. Доп. главы диф. ур-й"},
	{den: 3, para: 4, chzn: 2, aud:["1_310"], grp:[1.1], prep: ["Завгородний"], predm: "ТП"},
	{den: 3, para: 4, chzn: 2, aud:["1_325"], grp:[1.3,2,3.3,4.2], prep: ["Бенедиктова"], predm: "Немецкий язык"},

	{den: 4, para: 1, chzn: 2, aud:["1_306"], grp:[1.1,1.2,1.3], prep: ["Курина"], predm: "Мат. анализ"},
	{den: 4, para: 2, chzn: 2, aud:["1_437"], grp:[1.1,1.2,1.3], prep: ["Гликлих"], predm: "Диф. геометрия и топология"},
	{den: 4, para: 3, chzn: 0, aud:["1_333"], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 4, para: 3, chzn: 1, aud:["1_340"], grp:[1.1], prep: ["Шабров"], predm: "Мат. анализ"},
	{den: 4, para: 3, chzn: 0, aud:["1_343"], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 4, para: 3, chzn: 1, aud:["1_436"], grp:[1.2], prep: ["Ляпина"], predm: "Диф. ур-я"},
	{den: 4, para: 3, chzn: 2, aud:["1б_504П"], grp:[1.3], prep: ["Груздьев"], predm: "Диф. ур-я"},
	{den: 4, para: 4, chzn: 2, aud:["1_227"], grp:[1.1,1.2,1.3], prep: ["Звягин"], predm: "Современные методы геометрии и анализа"},
];

function prepareBase(){
	var baselen=base.length;
	var baseelem;
	var dubl;
	for(var i=0;i<baselen;i++){
		baseelem=base[i];
		if(baseelem.aud=='' || baseelem.grp=='' || baseelem.prep==''){
			base.splice(i,1);
			baselen--;
			i--;
			continue;
		}
		if(baseelem.chzn==2){
			baseelem.chzn=0;
			dubl=baseelem.clone();
			dubl.chzn=1;
			base.push(dubl);
		}
	}
	base=base.delDublByProp(["den",'para','chzn','aud','grp','prep']);
}
prepareBase();

var pary=[
	"8:00-9:35",
	"9:45-11:20",
	"11:20-13:05",
	"13:25-15:00",
	"15:10-16:45",
	"16:55-18:30",
	"18:40-20:00",
	"20:10-21:30",
];

var dni=[
	"Понедельник",
	"Вторник",
	"Среда",
	"Четверг",
	"Пятница",
	"Суббота",
];

var korpusa=[
	"1",
	"1а",
	"1б",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
];

function countTable(zagol,p1,p2,target,ugolnazv){

	var extLeftColumns=2;
	var extTopRows=1;
	var targetTable=document.createElement("table");
	var groups=base.getVariety(zagol);
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
			maintable[(baseElem.den*kolvoParVDen+baseElem.para)*2+baseElem.chzn%2]
				[groupsindex[baseElem[zagol][g]]+extLeftColumns]=
				[baseElem.predm,baseElem[p1],baseElem[p2]].join(' ');
			nagr[groupsindex[baseElem[zagol][g]]+extLeftColumns]++;
			otobrStroki[baseElem.den*kolvoParVDen+baseElem.para]=1;
		}

	}
	var maintableCopy=maintable.clone();
	for(var itr=0;itr<kolvoPar;itr++){
		maintable[itr]=maintable[itr].join('</td><td>').vTag('td');
	}

	var ih=maintable.join('</tr><tr>').vTag('tr');
	targetTable.innerHTML=th+ih+nagr.join('</td><td>').vTag('td').vTag('tr');
	$('#'+target)[0].appendChild(targetTable);

	$(targetTable).attr("cellspacing",0);
	$(targetTable).attr("cellpadding",0);

	var tablemap=[];
	var trs=targetTable.getElementsByTagName('tr');
	for(var i=0;i<kolvoPar;i++){
		tablemap[i]=trs[i+extTopRows].getElementsByTagName('td');
	}

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
					$(elemPerv).attr("colspan",1);
				}
				$(elemPerv).attr("colspan",1*$(elemPerv).attr("colspan")+1);
				tablemap[i][j].style.display="none";
			}else{
				elemPerv=0;
			}
		}
	}
	var rowspandni=[];

	for(var i=0;i<kolvoPar;i+=2){
		for(var j=extLeftColumns-1;j<kolvoGroups+extLeftColumns;j++){
			if(tablemap[i][j].innerHTML==tablemap[i+1][j].innerHTML){
				$(tablemap[i][j]).attr("rowspan","2");
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
		}
	}

}

function build(){
	$('#targetGroups')[0].innerHTML='';
	$('#targetAud')[0].innerHTML='';
	prepareBase();
	countTable("grp","prep","aud",'targetGroups','Группа');
	countTable("aud","prep","grp",'targetAud','Аудитория');
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
			}
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
	$('.jqplot-target').attr('width',stataudmas[0].length*50);
	
	jqplotBarRender('jqplot-pary',statpary,pary,0);
	jqplotBarRender('jqplot-dni' ,statdni ,dni ,0);
	jqplotBarRender('jqplot-aud' ,stataudmas[0],stataudmas[1],0);

	var podnyam=$('#jqplot-pary-po-dnyam')[0];
	for(var i=0;i<kolvoDni;i++){
		statpodnyammas[i]=statpodnyammas[i].sortNumericArr();
		statpodnyammas[i]=statpodnyammas[i].T();
		var h3=document.createElement('h3');
		h3.innerHTML=dni[i];
		podnyam.appendChild(h3);
		var targdiv=document.createElement('div');
		targdiv.id='jqplot-podnyam-'+dni[i];
		podnyam.appendChild(targdiv);
		jqplotBarRender('jqplot-podnyam-'+dni[i],statpodnyammas[i][0],statpodnyammas[i][1],0);
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
	var reader = new FileReader();
	// Closure to capture the file information.
	var f=$('#file-load')[0].files[0];
	reader.onload = (function(theFile) {
        return function(e) {
			try{
				base=base.concat(JSON.parse(e.target.result));
				build();
				diagr();
			}catch(e){
				alert('Не удалось импортировать базу из '+theFile.name)
			}
         };
      })(f);
      reader.readAsText(f);
}

function baseSave(){
	var blob = new Blob([JSON.stringify(base)], {
		type: "text/plain;charset=utf-8"
	});

	var a = document.createElement('a');
	a.download = "save.json";
	a.href = URL.createObjectURL(blob);
	a.innerHTML = "<button>Сохранить</button>";
	document.getElementById('span-save').appendChild(a);
}
baseSave();

function baseSaveEdited(){
	var len=$('#edit-target > tr').length;
	for(var i=0;i<len;i++){
		setProps(base[i],{
			den  :1*$('#den'  +i).val(),
			para :1*$('#para' +i).val(),
			chzn :1*$('#chzn' +i).val(),
			aud  :$('#aud'  +i).val().split(','),
			grp  :$('#grp'  +i).val().split(','),
			prep :$('#prep' +i).val().split(','),
			predm:$('#predm'+i).val(),
		});
	}
	prepareBase();
	baseSave();
	build();
	buildEdit();
}

function buildEdit(){
	var rez='';
	var elem;
	var commonVals=[0,1,2,3,4,5,6,7,8,9];
	var cz=['Числитель','Знаменатель','Не зависит'];
	base=[{
		den:0,
		para:0,
		chzn:0,
		aud:'',
		grp:'',
		prep:'',
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
			makeInput(elem.aud,"aud"+i),
			makeInput(elem.grp,"grp"+i),
			makeInput(elem.prep,"prep"+i),
			makeInput(elem.predm,"predm"+i),
		].tr();	
	}
	$('#edit-target').html(rez);
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

$('#textbase').val(JSON.stringify(base));
$(function(){
	$("#tabs").tabs();
	build();
	buildEdit();
});
