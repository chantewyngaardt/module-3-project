import {getDeliveryInformation, getSingleDeliveryInformation, insertDeliveryInformation, deleteDeliveryInformation, updateDeliveryInformation} from "../model/deliveryInformationModel.js"

const getDeliveryInformationCon = async (req, res)=>{
    res.json({deliveryInformation: await getDeliveryInformation()})
}

const getSingleDeliveryInformationCon = async(req,res)=>{
    res.json({deliveryInformation: await getSingleDeliveryInformation(req.params.delivery_id)})
}

const insertDeliveryInformationCon = async (req,res) => {
    let {phone_number, address_line, city, postal_code} = req.body
    console.log(req.body);
    res.json({
        delivery_information: await insertDeliveryInformation(phone_number, address_line, city, postal_code)
    })
}

const deleteDeliveryInformationCon = async (req,res) => {
    res.json({deliveryInformation: await deleteDeliveryInformation(req.params.delivery_id)})
}

const updateDeliveryInformationCon = async (req, res) => {
    let { phone_number, address_line, city, postal_code } = req.body;
    res.json({
        deliveryInformation: await updateDeliveryInformation(req.params.delivery_id, phone_number, address_line, city, postal_code)
    });
};

export {getDeliveryInformationCon, getSingleDeliveryInformationCon, insertDeliveryInformationCon, deleteDeliveryInformationCon, updateDeliveryInformationCon}