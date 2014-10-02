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


var base=[
	{aud:[319], grp:[1.1,1.2], den: 2, chzn: 0, para: 1, prep: ["Иванов И. И."], predm: "ИМХО"},
	{aud:[319], grp:[1.1,1.2], den: 2, chzn: 1, para: 1, prep: ["Иванов И. И."], predm: "ИМХО"},
	{aud:[309], grp:[1.1], den: 2, chzn: 0, para: 2, prep: ["Петров И. И."], predm: "Теория криптовалют"},
	{aud:[308], grp:[1.2], den: 2, chzn: 1, para: 2, prep: ["Петров И. И."], predm: "Теория криптовалют"},
	{aud:[319,320],grp:[1.1,1.2,1.3], den:1, chzn:0,para:0, prep:['Мячиков Ё.Ё.','Гантелькин Щ.Щ.'],predm:"Физкультура"}
];

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


function countTable(zagol,p1,p2){

var targetTable=document.createElement("table");
var groups=base.getVariety(zagol);
var th=('<td></td>'+groups.join('</th><th>').vTag('th')).vTag('tr');
var maintable=[];
var kolvoParVDen=pary.length;
var kolvoPar=kolvoParVDen*6*2;
var kolvoGroups=groups.length;
for(var i=0;i<kolvoPar;i++){
	maintable[i]=[
		pary[((i-1)/2).round()%kolvoParVDen].bold()
		];
	maintable[i].length=kolvoGroups+1;
}
var groupsindex={};
var nagr=['Нагрузка, ч/нед'];
for(var gi=0;gi<kolvoGroups;gi++){
	groupsindex[groups[gi]]=gi;
	nagr[gi+1]=0;
}

var kolvoBase=base.length;
var baseElem;
for(var j=0;j<kolvoBase;j++){
	baseElem=base[j];
	for(var g=0;g<baseElem.grp.length;g++){
		maintable[(baseElem.den*kolvoParVDen+baseElem.para)*2+baseElem.chzn][groupsindex[baseElem[zagol][g]]+1]=
			[baseElem.predm,baseElem[p1],baseElem[p2]].join(' ');
		nagr[groupsindex[baseElem[zagol][g]]+1]++;
	}
	
}
var maintableCopy=maintable.clone();
for(var itr=0;itr<kolvoPar;itr++){
	maintable[itr]=maintable[itr].join('</td><td>').vTag('td');
}

var ih=maintable.join('</tr><tr>').vTag('tr');
targetTable.innerHTML=th+ih+nagr.join('</td><td>').vTag('td').vTag('tr');
$('#target')[0].appendChild(targetTable);

$(targetTable).attr("cellspacing",0);
$(targetTable).attr("cellpadding",0);

var tablemap=[];
var trs=targetTable.getElementsByTagName('tr');
for(var i=0;i<kolvoPar;i++){
	tablemap[i]=trs[i+1].getElementsByTagName('td');
}

for(var i=0;i<kolvoPar;i++)
	for(var j=0;j<kolvoGroups+1;j++)
		if(tablemap[i][j].innerHTML===''){
			tablemap[i][j].innerHTML='&nbsp;';
			tablemap[i][j].className="empty";
		}

for(var i=0;i<kolvoPar;i++){
	var elemPerv=0;
	for(var j=2;j<kolvoGroups+1;j++){
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


for(var i=0;i<kolvoPar;i+=2){
	for(var j=0;j<kolvoGroups+1;j++){
		if(tablemap[i][j].innerHTML==tablemap[i+1][j].innerHTML){
			$(tablemap[i][j]).attr("rowspan","2");
			tablemap[i+1][j].style.display="none";
		}
	}
}

}

function build(){
	$('#target').html('');
	try{
		base=JSON.parse($('#textbase').val());
	}catch(e){
		alert('Ошибка в записи базы');
	}
	countTable("grp","prep","aud");
	countTable("aud","prep","grp");
	countTable("prep","grp","aud");
}

$('#textbase').val(JSON.stringify(base));
