const VillageInfo = require('../models/VillageInfo');

// Get village information with localization support
const getVillageInfo = async (req, res) => {
  try {
    const { lang = 'en' } = req.query;
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      const defaultVillageInfo = new VillageInfo({
        name_en: 'Okhawadi',
        name_mr: 'ओखावडी',
        name_hi: 'ओखावडी',
        taluka_en: 'Karjat',
        taluka_mr: 'कर्जत',
        taluka_hi: 'कर्जत',
        district_en: 'Ahmednagar',
        district_mr: 'अहमदनगर',
        district_hi: 'अहमदनगर',
        state_en: 'Maharashtra',
        state_mr: 'महाराष्ट्र',
        state_hi: 'महाराष्ट्र',
        pinCode: '424301',
        postOffice_en: 'Okhawadi',
        postOffice_mr: 'ओखावडी',
        postOffice_hi: 'ओखावडी',
        stdCode: '02428',
        elevation: '557',
        assemblyConstituency_en: 'Karjat North',
        assemblyConstituency_mr: 'कर्जत उत्तर',
        assemblyConstituency_hi: 'कर्जत उत्तर',
        assemblyMLA_en: 'TBD',
        assemblyMLA_mr: 'टीबीडी',
        assemblyMLA_hi: 'टीबीडी',
        lokSabhaConstituency_en: 'Shirdi',
        lokSabhaConstituency_mr: 'शिर्डी',
        lokSabhaConstituency_hi: 'शिर्डी',
        parliamentMP_en: 'TBD',
        parliamentMP_mr: 'टीबीडी',
        parliamentMP_hi: 'टीबीडी',
        sarpanch_en: 'TBD',
        sarpanch_mr: 'टीबीडी',
        sarpanch_hi: 'टीबीडी',
        population: 0,
        literacyRate: 0,
        area: 0,
        description_en: 'Welcome to Okhawadi village',
        description_mr: 'ओखावडी गावात आपले स्वागत आहे',
        description_hi: 'ओखावडी गांव में आपका स्वागत है',
        history_en: 'The history of Okhawadi village dates back several centuries.',
        history_mr: 'ओखावडी गावाचा इतिहास अनेक शतकांपूर्वीचा आहे.',
        history_hi: 'ओखावडी गांव का इतिहास कई शताब्दियों पुराना है।',
        culture_en: 'The culture of Okhawadi reflects traditional rural Maharashtra.',
        culture_mr: 'ओखावडीची संस्कृती पारंपारिक ग्रामीण महाराष्ट्राची प्रतिबिंबित करते.',
        culture_hi: 'ओखावडी की संस्कृति पारंपारिक ग्रामीण महाराष्ट्र को दर्शाती है।',
        schools: [],
        hospitals: [],
        waterSources: []
      });
      villageInfo = await defaultVillageInfo.save();
    }

    // Create localized response based on language preference
    const localizedVillageInfo = {
      _id: villageInfo._id,
      name: villageInfo[`name_${lang}`] || villageInfo.name_en,
      taluka: villageInfo[`taluka_${lang}`] || villageInfo.taluka_en,
      district: villageInfo[`district_${lang}`] || villageInfo.district_en,
      state: villageInfo[`state_${lang}`] || villageInfo.state_en,
      pinCode: villageInfo.pinCode,
      postOffice: villageInfo[`postOffice_${lang}`] || villageInfo.postOffice_en,
      stdCode: villageInfo.stdCode,
      elevation: villageInfo.elevation,
      assemblyConstituency: villageInfo[`assemblyConstituency_${lang}`] || villageInfo.assemblyConstituency_en,
      assemblyMLA: villageInfo[`assemblyMLA_${lang}`] || villageInfo.assemblyMLA_en,
      lokSabhaConstituency: villageInfo[`lokSabhaConstituency_${lang}`] || villageInfo.lokSabhaConstituency_en,
      parliamentMP: villageInfo[`parliamentMP_${lang}`] || villageInfo.parliamentMP_en,
      sarpanch: villageInfo[`sarpanch_${lang}`] || villageInfo.sarpanch_en,
      mapLink: villageInfo.mapLink,
      population: villageInfo.population,
      literacyRate: villageInfo.literacyRate,
      area: villageInfo.area,
      description: villageInfo[`description_${lang}`] || villageInfo.description_en,
      history: villageInfo[`history_${lang}`] || villageInfo.history_en,
      culture: villageInfo[`culture_${lang}`] || villageInfo.culture_en,
      grampanchayatContact: villageInfo[`grampanchayatContact_${lang}`] || villageInfo.grampanchayatContact_en,
      establishedYear: villageInfo.establishedYear,
      climate: villageInfo[`climate_${lang}`] || villageInfo.climate_en,
      malePopulation: villageInfo.malePopulation,
      femalePopulation: villageInfo.femalePopulation,
      otherPopulation: villageInfo.otherPopulation,
      totalHouses: villageInfo.totalHouses,
      schools: villageInfo.schools.map(s => ({
        name: s[`name_${lang}`] || s.name_en,
        type: s[`type_${lang}`] || s.type_en
      })),
      hospitals: villageInfo.hospitals.map(h => ({
        name: h[`name_${lang}`] || h.name_en,
        type: h[`type_${lang}`] || h.type_en
      })),
      waterSources: villageInfo.waterSources.map(w => w[`name_${lang}`] || w.name_en),
      mainOccupation: villageInfo[`mainOccupation_${lang}`] || villageInfo.mainOccupation_en,
      festivals: villageInfo[`festivals_${lang}`] || villageInfo.festivals_en,
      // Localized slider images
      sliderImages: (villageInfo.sliderImages || []).map(img => ({
        _id: img._id,
        url: img.url,
        caption: img[`caption_${lang}`] || img.caption_en || '',
        createdAt: img.createdAt
      })),
      createdAt: villageInfo.createdAt,
      updatedAt: villageInfo.updatedAt
    };

    res.status(200).json({
      success: true,
      data: localizedVillageInfo,
    });
  } catch (error) {
    console.error('Error in getVillageInfo:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching village information',
      error: error.message
    });
  }
};

// Helper function to convert schools number to array
const convertSchools = (schoolsValue) => {
  if (typeof schoolsValue === 'number') {
    const schools = [];
    for (let i = 0; i < schoolsValue; i++) {
      schools.push({
        name_en: `School ${i + 1}`,
        name_mr: `शाळा ${i + 1}`,
        name_hi: `स्कूल ${i + 1}`,
        type_en: 'Educational Institution',
        type_mr: 'शैक्षणिक संस्था',
        type_hi: 'शैक्षणिक संस्थान'
      });
    }
    return schools;
  }
  return schoolsValue;
};

// Helper function to convert hospitals number to array
const convertHospitals = (hospitalsValue) => {
  if (typeof hospitalsValue === 'number') {
    const hospitals = [];
    for (let i = 0; i < hospitalsValue; i++) {
      hospitals.push({
        name_en: `Healthcare Center ${i + 1}`,
        name_mr: `आरोग्य केंद्र ${i + 1}`,
        name_hi: `स्वास्थ्य केंद्र ${i + 1}`,
        type_en: 'Medical Facility',
        type_mr: 'वैद्यकीय सुविधा',
        type_hi: 'चिकित्सा सुविधा'
      });
    }
    return hospitals;
  }
  return hospitalsValue;
};

// Helper function to convert waterSources strings to objects
const convertWaterSources = (waterSourcesValue) => {
  if (Array.isArray(waterSourcesValue) && waterSourcesValue.length > 0) {
    if (typeof waterSourcesValue[0] === 'string') {
      return waterSourcesValue.map(source => ({
        name_en: source,
        name_mr: source,
        name_hi: source
      }));
    }
  }
  return waterSourcesValue;
};

// Create or update village information (full CRUD support)
const updateVillageInfo = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    // Process the request data to handle flexible types
    const processedData = { ...req.body };

    // Convert schools if it's a number
    if ('schools' in processedData) {
      processedData.schools = convertSchools(processedData.schools);
    }

    // Convert hospitals if it's a number
    if ('hospitals' in processedData) {
      processedData.hospitals = convertHospitals(processedData.hospitals);
    }

    // Convert waterSources if it's an array of strings
    if ('waterSources' in processedData) {
      processedData.waterSources = convertWaterSources(processedData.waterSources);
    }

    if (!villageInfo) {
      // If no village info exists, create new one
      villageInfo = new VillageInfo(processedData);
      await villageInfo.save();
    } else {
      // Update existing village info
      Object.assign(villageInfo, processedData);
      await villageInfo.save();
    }

    res.status(200).json({
      success: true,
      message: 'Village information updated successfully',
      data: villageInfo,
    });
  } catch (error) {
    console.error('Error in updateVillageInfo:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating village information',
      error: error.message
    });
  }
};

// Get raw village information (for admin panel - all languages)
const getVillageInfoForAdmin = async (req, res) => {
  try {
    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      // Create default village info if none exists
      const defaultVillageInfo = new VillageInfo({
        name_en: 'Okhawadi',
        name_mr: 'ओखावडी',
        name_hi: 'ओखावडी',
        taluka_en: 'Karjat',
        taluka_mr: 'कर्जत',
        taluka_hi: 'कर्जत',
        district_en: 'Ahmednagar',
        district_mr: 'अहमदनगर',
        district_hi: 'अहमदनगर',
        state_en: 'Maharashtra',
        state_mr: 'महाराष्ट्र',
        state_hi: 'महाराष्ट्र',
        pinCode: '424301',
        postOffice_en: 'Okhawadi',
        postOffice_mr: 'ओखावडी',
        postOffice_hi: 'ओखावडी',
        stdCode: '02428',
        elevation: '557',
        assemblyConstituency_en: 'Karjat North',
        assemblyConstituency_mr: 'कर्जत उत्तर',
        assemblyConstituency_hi: 'कर्जत उत्तर',
        assemblyMLA_en: 'TBD',
        assemblyMLA_mr: 'टीबीडी',
        assemblyMLA_hi: 'टीबीडी',
        lokSabhaConstituency_en: 'Shirdi',
        lokSabhaConstituency_mr: 'शिर्डी',
        lokSabhaConstituency_hi: 'शिर्डी',
        parliamentMP_en: 'TBD',
        parliamentMP_mr: 'टीबीडी',
        parliamentMP_hi: 'टीबीडी',
        sarpanch_en: 'TBD',
        sarpanch_mr: 'टीबीडी',
        sarpanch_hi: 'टीबीडी',
        schools: [],
        hospitals: [],
        waterSources: []
      });
      villageInfo = await defaultVillageInfo.save();
    }

    res.status(200).json({
      success: true,
      data: villageInfo,
    });
  } catch (error) {
    console.error('Error in getVillageInfoForAdmin:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching village information for admin',
      error: error.message
    });
  }
};

// Delete village information (reset to defaults)
const deleteVillageInfo = async (req, res) => {
  try {
    const deleted = await VillageInfo.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'Village information reset successfully',
      deletedCount: deleted.deletedCount,
    });
  } catch (error) {
    console.error('Error in deleteVillageInfo:', error);
    res.status(400).json({
      success: false,
      message: 'Error resetting village information',
      error: error.message
    });
  }
};

// Upload slider image (max 4 images)
const uploadSliderImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image uploaded'
      });
    }

    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      villageInfo = new VillageInfo();
    }

    // Check if maximum images limit reached
    if (villageInfo.sliderImages && villageInfo.sliderImages.length >= 4) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 4 images allowed in slider'
      });
    }

    const newImage = {
      url: `/uploads/${req.file.filename}`,
      caption_en: req.body.caption_en || '',
      caption_mr: req.body.caption_mr || '',
      caption_hi: req.body.caption_hi || '',
      createdAt: new Date()
    };

    if (!villageInfo.sliderImages) {
      villageInfo.sliderImages = [];
    }

    villageInfo.sliderImages.push(newImage);
    await villageInfo.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: villageInfo.sliderImages
    });
  } catch (error) {
    console.error('Error in uploadSliderImage:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image',
      error: error.message
    });
  }
};

// Delete slider image
const deleteSliderImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      return res.status(404).json({
        success: false,
        message: 'Village information not found'
      });
    }

    if (!villageInfo.sliderImages) {
      return res.status(404).json({
        success: false,
        message: 'No slider images found'
      });
    }

    // Remove the image with matching ID
    const initialLength = villageInfo.sliderImages.length;
    villageInfo.sliderImages = villageInfo.sliderImages.filter(
      img => img._id.toString() !== imageId
    );

    if (villageInfo.sliderImages.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    await villageInfo.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
      data: villageInfo.sliderImages
    });
  } catch (error) {
    console.error('Error in deleteSliderImage:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

// Update slider image caption
const updateSliderImageCaption = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { caption_en, caption_mr, caption_hi } = req.body;

    let villageInfo = await VillageInfo.findOne();

    if (!villageInfo) {
      return res.status(404).json({
        success: false,
        message: 'Village information not found'
      });
    }

    if (!villageInfo.sliderImages) {
      return res.status(404).json({
        success: false,
        message: 'No slider images found'
      });
    }

    const imageIndex = villageInfo.sliderImages.findIndex(
      img => img._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Update captions
    if (caption_en !== undefined) villageInfo.sliderImages[imageIndex].caption_en = caption_en;
    if (caption_mr !== undefined) villageInfo.sliderImages[imageIndex].caption_mr = caption_mr;
    if (caption_hi !== undefined) villageInfo.sliderImages[imageIndex].caption_hi = caption_hi;

    await villageInfo.save();

    res.status(200).json({
      success: true,
      message: 'Image caption updated successfully',
      data: villageInfo.sliderImages[imageIndex]
    });
  } catch (error) {
    console.error('Error in updateSliderImageCaption:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating image caption',
      error: error.message
    });
  }
};

module.exports = {
  getVillageInfo,
  updateVillageInfo,
  getVillageInfoForAdmin,
  deleteVillageInfo,
  uploadSliderImage,
  deleteSliderImage,
  updateSliderImageCaption,
};