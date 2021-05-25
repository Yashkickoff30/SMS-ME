pragma solidity ^0.7.6;
pragma abicoder v2;
contract User{

    uint public patientCount;

    struct Patient{
        string patientName;
        string age;
        string gender;
        Medicines[] medicines;
        Records[] records;
    }

    struct Medicines {
        string medicineName;
        string dosage;
    }
    
    struct Records {
        string desc;
        string date;
    }

    mapping(string => Patient) patientDetails;

    function setPatientDetails(string memory id, string memory name, string memory age, string memory gender) public{
        uint index = patientCount + 1;
        Patient storage patientDetail = patientDetails[id];

        patientDetail.patientName = name;
        patientDetail.age = age;
        patientDetail.gender = gender;
        patientCount++;
    }

    function getPatientDetails(string memory id) public view returns(string memory, string memory , string memory, Medicines[] memory, Records[] memory){
        
        Patient storage patientDetail = patientDetails[id];
        return (
            patientDetail.patientName,
            patientDetail.age,
            patientDetail.gender,
            patientDetail.medicines,
            patientDetail.records
        );
    }
    
  
    
    function addMedicine(string memory id, string memory medicineName, string memory dosage) public{
       
        Medicines memory med;
        med.medicineName = medicineName;
        med.dosage = dosage;

        Patient storage patientDetail = patientDetails[id];
        patientDetail.medicines.push(med);
      
    }

 
    function getMedicines(string memory id) public view returns(Medicines[] memory) {
        return patientDetails[id].medicines;
    }
    
    function getRecords(string memory id) public view returns(Records[] memory) {
        return patientDetails[id].records;
    }
    
    function addRecord(string memory id ,string memory description, string memory date) public{
        
        Records memory record;
        record.desc = description;
        record.date = date;

        Patient storage patientDetail = patientDetails[id];
        patientDetail.records.push(record);
        
    } 
}
