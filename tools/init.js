var InitJava = function (){
	
}



InitJava.prototype.init = function (){
	InitJava.setting = {
		author : '',
		desc   : '',
		tName  : '',
		pName  : [],	//['int', 'id']
		oList  : [],	//[['int', 'xx'], ['string', 'bbb']]
		packName: ''
	}
	
	
	function getType(str){
		str = str.toUpperCase();
		if(str === 'INT'){
			return 'int';
		}
		if(str === 'STRING'){
			return 'String';
		}
	}
	
	/*
	 * 转换属性名称
	 * 首字母小写
	 */
	function parseNameToLower(nameStr){
		return nameStr.substr(0,1).toLowerCase() + nameStr.substr(1);
	}
	/*
	 * 转换属性名称
	 * 首字母大写
	 */
	function parseNameToUpper(str){
		return str.substr(0,1).toUpperCase() + str.substr(1);
	}
	
	// 初始化参数
	InitJava.setting.author = $('#author').val();
	InitJava.setting.desc = $('#desc').val();
	InitJava.setting.packName = $('#packName').val();
	InitJava.setting.tName = parseNameToUpper($('#tableName').val());
	var pNameArr = $('#pColumn').val().split(' ');
	if(pNameArr.length > 1){
		InitJava.setting.pName = [getType(pNameArr[0]), parseNameToLower(pNameArr[1])];
	}else{
		InitJava.setting.pName = ['int', parseNameToLower(pNameArr[0])];
	}
	var list = $('#oColumn').val().split('\n');
	for(var i=0; i< list.length; i++){
		var colAttr = list[i].split(' ');
		if(colAttr.length > 1){
			InitJava.setting.oList.push([getType(colAttr[0]), parseNameToLower(colAttr[1])]);
		}else{
			InitJava.setting.oList.push(['string', parseNameToLower(colAttr[1])]);
		}
	}
	
	var n = '\n', n2 = n + n;
	var date = new Date();
	var dateStr = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
	
	var suffix =  ';' + n + n;
	
	/**
	 * 生成属性代码 
	 */
	function initVoProperty(attr){
		return '    private ' + attr[0] + ' ' + attr[1] + suffix;
	}
	/**
	 * 生成属性get,set方法 
	 */
	function initVoGetSet(attr){
		var getSet = '    public ' + attr[0] + ' ' + 'get' + parseNameToUpper(attr[1]) + '() {' + n;
		getSet    += '        return ' + attr[1] + ';' + n;
		getSet 	  += '    }' + n2;
		getSet    += '    public void set' + parseNameToUpper(attr[1]) + '(' + attr[0] + ' ' + attr[1] + ') {' + n;
		getSet    += '        this.' + attr[1] + ' = ' + attr[1] + ';' + n ;
		getSet    += '    }';
		return getSet;
	}
	
	/**
	 * 初始化注释信息 
	 */
	function initReamrk(classType, desc){
		var result = '';
		switch(classType.toLowerCase()){
			case 'vo' :
				desc = desc;
				break;
			case 'bean':
				desc += 'Bean层';
				break;
			case 'dao':
				desc += 'Dao层';
				break;
		}
		var remarkStr =  '/**' + n;
		remarkStr += ' * '  + desc + n;
		remarkStr += ' * @author	' + InitJava.setting.author + n;
		remarkStr += ' * @created	' + dateStr + n;
		remarkStr += ' *' + n;
		remarkStr += ' */' + n;
		return remarkStr;
	}
	
	var voClassName = InitJava.setting.tName +'Vo',
		beanClassName = InitJava.setting.tName +'Bean',
		daoClassName = InitJava.setting.tName +'Dao';
	
	/**
	 * 生成VO层代码 
	 */
	function initVo(){
		var result = '';
		var packStr = 'package ' + InitJava.setting.packName + '.vo;' + n2;
		var importStr = 'import java.util.Map;' + n;
		importStr    += 'import java.util.TreeMap;' + n;
		result += packStr + importStr + n;
		
		result += initReamrk('vo', InitJava.setting.desc);
		
		var classStr = 'public class ' + voClassName + ' {' + n;
		classStr += n;
		
		// 生成属性
		//var propStr = 
		var propStr = initVoProperty(InitJava.setting.pName);
		propStr    += initVoGetSet(InitJava.setting.pName) + n2;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			propStr += initVoProperty(InitJava.setting.oList[i]);
			propStr += initVoGetSet(InitJava.setting.oList[i]) + n2;
		}
		
		var methodStr = '    public ' + voClassName + '() {' + n2 + '    }' + n2;
		methodStr    += '    public ' + voClassName + '(' + InitJava.setting.pName[0] + ' ' + InitJava.setting.pName[1];
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var attr = InitJava.setting.oList[i];
			methodStr += ', ' + attr[0] + ' ' + attr[1];
		}
		methodStr += '){' + n;
		methodStr += '        this.'+ InitJava.setting.pName[1] + ' = ' + InitJava.setting.pName[1] + ';' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var attr = InitJava.setting.oList[i];
			methodStr += '        this.'+ attr[1] + ' = ' + attr[1] + ';' + n;
		}
		methodStr += '    }' + n;
		
		var mapStr = '    public Map<Object, Object> getMap() {' + n;
			mapStr+= '        Map<Object, Object> map = new TreeMap<Object, Object>();' + n;
			mapStr+= '        map.put("' + InitJava.setting.pName[1] + '", this.' + InitJava.setting.pName[1] + ');' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var attr = InitJava.setting.oList[i];
			mapStr+= '        map.put("'+ attr[1] + '", this.' + attr[1] + ');' + n;
		}
			mapStr+= '        return map;' + n;
			mapStr+= '    }' + n;
		
		classStr += propStr + methodStr + mapStr + '}' + n;
		result += classStr;
		return result;
	}
	
	/**
	 * 生成Bean层代码 
	 */
	function initBean(){
		var result = '', desc = InitJava.setting.desc;
		var packStr = 'package ' + InitJava.setting.packName + '.bean;' + n2;
		var importStr = 'import java.util.List;' + n;
		importStr    += 'import com.eaglory.report.db.base.BeanBase;' + n;
		importStr    += 'import com.skyeagle.oa.purview.dao.' + InitJava.setting.tName + 'Dao;' + n;
		importStr    += 'import com.skyeagle.oa.purview.vo.' + InitJava.setting.tName + 'Vo;' + n;
		result += packStr + importStr + n;
		
		result += initReamrk('bean', desc);
		
		var classStr = 'public class ' + beanClassName + ' extends BeanBase {' + n2;
		classStr 	+= '    private ' + daoClassName + ' dao = null;' + n2;
		classStr 	+= '    public ' + beanClassName + '(){' + n;
		classStr    += '        this.dao = new ' + daoClassName + '();' + n;
		classStr    += '    }' + n2;
		
		var methodStr = '';
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 根据ID获取单个' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	' + voClassName + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public ' + voClassName + ' get' + voClassName +'(' + InitJava.setting.pName[0] + ' ' +  InitJava.setting.pName[1] + '){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        ' + voClassName + ' vo = dao.get' + voClassName +'(' + InitJava.setting.pName[1] + ');' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return vo;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 获取所有' + desc + n;
		methodStr 	 += '     * @return	List<' + voClassName + '>' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public List<' + voClassName + '> getAll' + InitJava.setting.tName +'(){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        List<' + voClassName + '> result = dao.getAll' + InitJava.setting.tName + '();' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 添加' + desc + n;
		methodStr 	 += '     * @param	' + voClassName + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean add' + InitJava.setting.tName +'(' + voClassName + ' vo){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        boolean result = dao.add' + InitJava.setting.tName +'(vo);' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 删除' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean delete' + InitJava.setting.tName +'(' + InitJava.setting.pName[0] + ' ' +  InitJava.setting.pName[1] + '){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        boolean result = dao.delete' + InitJava.setting.tName +'(' + InitJava.setting.pName[1] + ');' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 更新' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean update' + InitJava.setting.tName +'(' + voClassName + ' vo){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        boolean result = dao.update' + InitJava.setting.tName +'(vo);' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 查询' + desc + '总条数' + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public int getCount(){' + n;
		methodStr 	 += '        this.startDBBussiness(false);' + n;
		methodStr 	 += '        this.initialDAO(dao);' + n;
		methodStr 	 += '        int result = dao.getCount();' + n;
		methodStr 	 += '        this.endDBBussiness();' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		classStr += methodStr;
		classStr += '}' + n;
		result += classStr;
		
		return result;
	}
	
	/**
	 * 返回大写字符串 
	 */
	function toUpper(str){
		return str && str.toUpperCase();
	}
	
	/**
	 * 讲集合转换为字符串
	 * 例如： [['int','id'],['string','name']] 
	 * return : ', ID, NAME'
	 */
	function getAttrStr(attr){
		var result = '';
		for(var i=0; i<attr.length; i++){
			result += toUpper(attr[i][1]);
			if(i < attr.length -1){
				result += ', ';
			}
		}
		return result;
	}
	/**
	 * 获取集合代替的字符串 
	 */
	function getAttrUnStr(attr){
		var result = '';
		for(var i=0; i<attr.length; i++){
			result += '?';
			if(i < attr.length -1){
				result += ', ';
			}
		}
		return result;
	}
	
	/**
	 * 获取集合代替的字符串 
	 */
	function getUpdateAttrUnStr(attr){
		var result = '';
		for(var i=0; i<attr.length; i++){
			result += toUpper(attr[i][1]) + ' = ?';
			if(i < attr.length -1){
				result += ', ';
			}
		}
		return result;
	}
	
	/**
	 * 生成Bean层代码 
	 */
	function initDao(){
		var result = '', desc = InitJava.setting.desc;
		var packStr = 'package ' + InitJava.setting.packName + '.dao;' + n2;
		var importStr = 'import java.util.List;' + n;
		importStr    += 'import java.util.ArrayList;' + n;
		importStr    += 'import org.apache.commons.logging.Log;' + n;
		importStr    += 'import org.apache.commons.logging.LogFactory;' + n;
		importStr    += 'import com.eaglory.report.db.base.DBBase;' + n;
		importStr    += 'import com.skyeagle.oa.purview.vo.' + InitJava.setting.tName + 'Vo;' + n;
		result += packStr + importStr + n;
		
		result += initReamrk('dao', desc);
		var tbStr = 'SKY_';
		
		var classStr = 'public class ' + daoClassName + ' extends DBBase {' + n2;
		classStr 	+= '    private static Log logger = LogFactory.getLog(' + daoClassName + '.class);' + n2;
		classStr 	+= '    private static String queryAllSql = "SELECT ' + toUpper(InitJava.setting.pName[1]) + ', '
			+ getAttrStr(InitJava.setting.oList) + ' FROM ' + tbStr + toUpper(InitJava.setting.tName) + '";' + n2;
		classStr 	+= '    private static String querySingleSql = "SELECT ' + getAttrStr(InitJava.setting.oList) 
			+ ' FROM ' + tbStr + toUpper(InitJava.setting.tName) + ' WHERE ' + toUpper(InitJava.setting.pName[1]) +' = ?";' + n2;
		classStr 	+= '    private static String insertSql = "INSERT INTO ' + tbStr + toUpper(InitJava.setting.tName) 
			+ '(' + getAttrStr(InitJava.setting.oList) + ') VALUES (' + getAttrUnStr(InitJava.setting.oList) + ')";' + n2;
		classStr 	+= '    private static String deleteSql = "DELETE FROM ' + tbStr + toUpper(InitJava.setting.tName) 
			+ ' WHERE ' + toUpper(InitJava.setting.pName[1]) + ' = ?";' + n2;
		classStr 	+= '    private static String queryCount = "SELECT COUNT(*) AS COUNT FROM ' + tbStr + toUpper(InitJava.setting.tName) 
			+ '";' + n2;
		classStr 	+= '    private static String updateSql = "UPDATE ' + tbStr + toUpper(InitJava.setting.tName) + 
			' SET ' + getUpdateAttrUnStr(InitJava.setting.oList) + ' WHERE ' + toUpper(InitJava.setting.pName[1]) + ' = ?";' + n2;
		
		var methodStr = '';
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 根据ID获取单个' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	' + voClassName + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public ' + voClassName + ' get' + voClassName +'(' + InitJava.setting.pName[0] + ' ' +  InitJava.setting.pName[1] + '){' + n;
		methodStr 	 += '        ' + voClassName + ' vo = new ' + voClassName + '();' + n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.querySingleSql);' + n;
		methodStr 	 += '            this.pStmt.setInt(1, ' + InitJava.setting.pName[1] + ');' + n;
		methodStr 	 += '            this.executeQuery();' + n;
		methodStr 	 += '            if(this.rs.next()){' + n;
		methodStr 	 += '                vo.set' + parseNameToUpper(InitJava.setting.pName[1]) + '(' + InitJava.setting.pName[1] + ');' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var otherCol = InitJava.setting.oList[i];
			methodStr 	 += '                vo.set' + parseNameToUpper(otherCol[1]) + '(this.rs.get' + parseNameToUpper(otherCol[0]) + '("' + toUpper(otherCol[1]) +'"));' + n;
		}
		methodStr 	 += '            }' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("查询' + desc + 'ID为：" + ' + InitJava.setting.pName[1] + ' + "失败" + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return vo;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 获取所有' + desc + n;
		methodStr 	 += '     * @return	List<' + voClassName + '>' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public List<' + voClassName + '> getAll' + InitJava.setting.tName +'(){' + n;
		methodStr 	 += '        List<' + voClassName + '> result = new ArrayList<' + voClassName + '>();'+ n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.queryAllSql);' + n;
		methodStr 	 += '            this.executeQuery();' + n;
		methodStr 	 += '            while(this.rs.next()){' + n;
		methodStr 	 += '                ' + voClassName +' vo = new ' + voClassName + '();' + n;
		methodStr 	 += '                vo.set' + parseNameToUpper(InitJava.setting.pName[1]) + '(this.rs.get' + parseNameToUpper(InitJava.setting.pName[0])+ '("' + toUpper(InitJava.setting.pName[1]) +'"));' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var otherCol = InitJava.setting.oList[i];
			methodStr 	 += '                vo.set' + parseNameToUpper(otherCol[1]) + '(this.rs.get' + parseNameToUpper(otherCol[0]) + '("' + toUpper(otherCol[1]) +'"));' + n;
		}
		methodStr 	 += '                result.add(vo);' + n;
		methodStr 	 += '            }' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("查询所有 ' + desc + '失败" + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 添加' + desc + n;
		methodStr 	 += '     * @param	' + voClassName + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean add' + InitJava.setting.tName +'(' + voClassName + ' vo){' + n;
		methodStr 	 += '        boolean result = false;' + n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.insertSql);' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var otherCol = InitJava.setting.oList[i];
			methodStr 	 += '            this.pStmt.set' + parseNameToUpper(otherCol[0]) + '(' + (i + 1) + ', vo.get' + parseNameToUpper(otherCol[1]) + '());' + n;
		}
		methodStr 	 += '            result = this.executeUpdate() > 0;' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("添加' + desc + '失败" + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 删除' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean delete' + InitJava.setting.tName +'(' + InitJava.setting.pName[0] + ' ' +  InitJava.setting.pName[1] + '){' + n;
		methodStr 	 += '        boolean result = false;' + n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.deleteSql);' + n;
		methodStr 	 += '            this.pStmt.set' + parseNameToUpper(InitJava.setting.pName[0]) + '(1, '+ InitJava.setting.pName[1] + ');' + n;
		methodStr 	 += '            result = this.executeUpdate() > 0;' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("删除' + InitJava.setting.pName[1] + '为:" + ' + InitJava.setting.pName[1] + ' + "失败" + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 更新' + desc + n;
		methodStr 	 += '     * @param	' + InitJava.setting.pName[1] + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public boolean update' + InitJava.setting.tName +'(' + voClassName + ' vo){' + n;
		methodStr 	 += '        boolean result = false;' + n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.updateSql);' + n;
		for(var i=0; i<InitJava.setting.oList.length; i++){
			var otherCol = InitJava.setting.oList[i];
			methodStr+= '            this.pStmt.set' + parseNameToUpper(otherCol[0]) + '(' + (i + 1) + ', vo.get' + parseNameToUpper(otherCol[1]) + '());' + n;
		}
		methodStr 	 += '            this.pStmt.set' + parseNameToUpper(InitJava.setting.pName[0]) + '(' + (i + 1) + ', vo.get' + parseNameToUpper(InitJava.setting.pName[1]) + '());' + n;
		methodStr 	 += '            result = this.executeUpdate() > 0;' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("更新' + desc + InitJava.setting.pName[1] + '为:" + vo.get' + parseNameToUpper(InitJava.setting.pName[1]) + '() + "失败" + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return result;' + n;
		methodStr 	 += '    }' + n2;
		
		methodStr	 += '    /**' + n;
		methodStr 	 += '     * 查询' + desc + '总条数' + n;
		methodStr 	 += '     * @return	boolean' + n;
		methodStr 	 += '     */' + n;
		methodStr 	 += '    public int getCount(){' + n;
		methodStr 	 += '        int count = 0;' + n;
		methodStr 	 += '        try{' + n;
		methodStr 	 += '            this.prepareStatement(this.queryCount);' + n;
		methodStr 	 += '            this.executeQuery();' + n;
		methodStr 	 += '            if (this.rs.next()) {' + n;
		methodStr 	 += '                count = this.rs.getInt("COUNT");' + n;
		methodStr 	 += '            }' + n;
		methodStr 	 += '        }catch(Exception ex){' + n;
		methodStr 	 += '            this.logger.error("查询' + desc + '总条数失败 " + ex.getMessage());' + n;
		methodStr 	 += '        }finally{' + n;
		methodStr 	 += '            this.close();' + n;
		methodStr 	 += '        }' + n;
		methodStr 	 += '        return count;' + n;
		methodStr 	 += '    }' + n2;
		
		classStr += methodStr;
		classStr += '}' + n;
		result += classStr;
		
		return result;
	}
	
	$('#vo').val(initVo());
	$('#bean').val(initBean());
	$('#dao').val(initDao());
}
