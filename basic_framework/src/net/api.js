let url = 'http://112.126.78.133:8080'

export default class GLOBAL_API {
    static get_Visit_Record_List = "http://112.126.78.133:8080/crm_back_end/visit_record_info/paged_query_visit_record_list";     //查询拜访记录列表请求
    static add_visit_record = "http://112.126.78.133:8080/crm_back_end/visit_record_info/create_visit_record";              //新增拜访记录请求
    static search_by_keywords = "http://112.126.78.133:8080/crm_back_end/visit_record_info/query_visit_record_by_keyword";     //通过关键词查找拜访记录
    static get_Visit_Record_By_Id = "http://112.126.78.133:8080/crm_back_end/visit_record_info/query_visit_record_by_visit_record_id";  //通过拜访记录ID查找拜访记录
    static getvrl = url + "/crm_back_end/visit_record_info/query_newly_added_visit_record_count";
    static getContact = url + '/crm_back_end/contact_info/query_contact_by_contact_id';
    static createlxr = url + '/crm_back_end/contact_info/create_contact_info';//创建联系人
    static getCompanyList = url +'/crm_back_end/company_info/paged_query_company_info_list';
    static querylxrl = url + '/crm_back_end/contact_info/paged_query_contact_list';//查询联系人列表
    static getRank = url + '/crm_back_end/staff_info/query_staff_rank_info';	
    static getStaffInfo = url + '/crm_back_end/staff_info/query_staff_info';
    static editContactInfo = url +'/crm_back_end/contact_info/edit_contact_info';
    static getTeam	= url +'/crm_back_end/staff_info/paged_query_staff_info_list';
    static getStaffVisitList =url +'/crm_back_end/visit_record_info/paged_query_visit_record_list';
    static share=url+ '/crm_back_end/contact_info/share_contact_info';
    static cancelShare=url+ '/crm_back_end/contact_info/cancel_share_contact_info';
    static getShareList=url+'/crm_back_end/staff_info/query_share_list';
    static getnacc = url + '/crm_back_end/company_info/query_newly_added_company_count';
    static getpqsil = url + '/crm_back_end/staff_info/paged_query_staff_info_list';
    static getcil = url + '/crm_back_end/company_info/paged_query_company_info_list';
    static getpqcl = url + '/crm_back_end/contact_info/paged_query_contact_list';
    static getqvrbc = url + '/crm_back_end/visit_record_info/query_visit_record_by_companyId';
    static newCom = url + '/crm_back_end/company_info/create_company_info';
    static denglu = url + "/crm_back_end/staff_info/verify_password";
    static getCompany =url+ '/crm_back_end/company_info/query_company_info_by_company_id';
    static getqnacc = url + '/crm_back_end/contact_info/query_newly_added_contact_count';
}