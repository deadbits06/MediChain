pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract MediChain {
    struct Doctor {
        uint dId;
        address accountAddress;
        string firstName;
        string lastName;
        string dob;
        uint contactNumber;
        string email;
        string designation;
        string domain;
        string gender;
        bool maritalStatus;
        uint[] patientId;
    }

    struct Patient {
        uint pId;
        string firstName;
        string lastName;
        string dob;
        uint contactNumber;
        string email;
        string occupation;
        string gender;
        bool maritalStatus;
        bool insured;
        address accountAddress;        
        string[] treatmentId;
    }

    struct Treatment {
        string tId;  //d1.d2.d3$pn//making string
        string name;
        uint[] dId;
    }

    struct AuthenticateDevice {
        uint dId;  //d1.d2.d3$pn
        string[] MAC;
    }

    struct SecretKey{
        string tId;    
        string key;
    }


    mapping(uint => Doctor) doctorMapping;
    mapping(uint => Patient) patientMapping;
    mapping(string => Treatment) treatmentMapping;
    mapping(uint => AuthenticateDevice) deviceMapping;
    mapping(string => SecretKey) SecretKeyMapping;

    //Patient Data
    //100,"Nishant","Nimbalkar","09-10-1998",7775026761,"nimbalkarnishant98@gmail.com","male",false,true,20
    //101,"Alok","Pandey","25-06-199",9852643727,"alokrocks217@gmail.com","male",false,true,20

    function patientRegisteration(uint _pId,string _firstName,string _lastName,string _dob,uint _contactNumber,string _email,string _gender,bool _maritalStatus,bool _insured) public payable returns(uint){

        Patient patient;
        patient.pId = _pId;
        patient.firstName = _firstName;
        patient.lastName = _lastName;
        patient.dob = _dob;
        patient.contactNumber = _contactNumber;
        patient.email = _email;
        patient.gender =  _gender;
        patient.maritalStatus =  _maritalStatus;
        patient.insured =  _insured;
        patientMapping[_pId] = patient; 
        return 1;
    }

    //Doctor Data
    //1,"Jayesh","Kukreja","25-02-1998",7666821600,"jayeshkukreja27@gmail.com","M.D","Oncologist","male",false,20

    function doctorRegisteration(uint _dId,string _firstName,string _lastName,string _dob,uint _contactNumber,string _email,string _designation,string _domain,string _gender,bool _maritalStatus,address _address) public payable returns(uint){

        Doctor doctor;
        doctor.dId = _dId;
        doctor.firstName = _firstName;
        doctor.lastName = _lastName;
        doctor.dob = _dob;
        doctor.contactNumber = _contactNumber;
        doctor.email = _email;
        doctor.gender =  _gender;
        doctor.maritalStatus =  _maritalStatus;
        doctor.domain = _domain;
        doctor.designation = _designation;
        doctor.accountAddress = _address;
        doctorMapping[_dId] = doctor; 
        return 1;
    }

    function getdoctorAddress(uint _dId) public view returns (address){
        return (doctorMapping[_dId].accountAddress);
    }


    //Mapping of doctor and patient
    function addPatients(uint _dId,uint _pId) public payable returns (uint) {
        doctorMapping[_dId].patientId.push(_pId); 
        return 1;
    }

    //Mapping of patient and treatment(adding all the treatments the patient has undergone)
    function addTreatmentToPatient(uint _pId,string _tId) public payable returns (uint) {
        patientMapping[_pId].treatmentId.push(_tId); 
        return 1;
    }


    //Retrieve patient details
    function getPatient(uint _pId) public view returns (string , string ) {
        return (patientMapping[_pId].firstName,patientMapping[_pId].lastName);
    }

    //Retrieve array of patients from logged in doctor
    function getPatientArray(uint _dId) public view returns (uint[]) {
        return (doctorMapping[_dId].patientId);
    }


    //Retrieve array of treatments which patient has undergone
    function getTreatmentArray(uint _pId) public view returns (string[]) {
        return (patientMapping[_pId].treatmentId);
    }

    //Set the MAC address of the doctors device
    function addMAC(uint _dId,string[] _MAC) public payable returns (uint) {
        AuthenticateDevice newnode;
        newnode.dId = _dId;
        newnode.MAC = _MAC;
        deviceMapping[_dId] = newnode; 
        return 1;
    }


    //Retrieve the MAC address of the doctors device
    function getMAC(uint _dId) public view returns (string[]) {
        return (deviceMapping[_dId].MAC);
    }

   function setSecretKey(string _tId, string _key) public payable returns(uint){
        SecretKey newnode;
        newnode.tId = _tId;
        newnode.key = _key; 
        return 1;
    }


    function getSecretKey(string _tId) public view returns (string) {
        return (SecretKeyMapping[_tId].key);
    }


}