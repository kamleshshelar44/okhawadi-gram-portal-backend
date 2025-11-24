const mongoose = require('mongoose');
require('dotenv').config();
const VillageInfo = require('../models/VillageInfo');
const News = require('../models/News');
const Contact = require('../models/Contact');

const seedVillageData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');

    // Clear existing data
    await VillageInfo.deleteMany({});
    await News.deleteMany({});
    await Contact.deleteMany({});

    // Create village info with new multilingual schema
    const villageInfo = new VillageInfo({
      // Basic village information with multilingual support
      name_en: 'Okhawadi',
      name_mr: 'ओखवडी',
      name_hi: 'ओखवाडी',

      taluka_en: 'Jawali',
      taluka_mr: 'जावली',
      taluka_hi: 'जावली',

      district_en: 'Satara',
      district_mr: 'सातारा',
      district_hi: 'सातारा',

      state_en: 'Maharashtra',
      state_mr: 'महाराष्ट्र',
      state_hi: 'महाराष्ट्र',

      // Postal and communication
      pinCode: '415012',
      postOffice_en: 'Medha',
      postOffice_mr: 'मेढा',
      postOffice_hi: 'मेढा',
      stdCode: '02378',
      elevation: '678',

      // Government representation
      assemblyConstituency_en: 'Satara Assembly Constituency',
      assemblyConstituency_mr: 'सातारा विधानसभा मतदारसंघ',
      assemblyConstituency_hi: 'सातारा विधानसभा निर्वाचन क्षेत्र',

      assemblyMLA_en: 'Shrimant Chh.Shivendrasinh Abhaysinhraje Bhosale',
      assemblyMLA_mr: 'श्रीमंत छ.शिवेंद्रसिंह अभयसिंहराजे भोसले',
      assemblyMLA_hi: 'श्रीमंत छ.शिवेंद्रसिंह अभयसिंहराजे भोसले',

      lokSabhaConstituency_en: 'Satara Parliamentary Constituency',
      lokSabhaConstituency_mr: 'सातारा लोकसभा मतदारसंघ',
      lokSabhaConstituency_hi: 'सातारा लोकसभा निर्वाचन क्षेत्र',

      parliamentMP_en: 'Shrimant Chh. Udayanraje Pratapsinhmaharaj Bhosale',
      parliamentMP_mr: 'श्रीमंत छ.उदयनराजे प्रतापसिंहमहाराज भोसले',
      parliamentMP_hi: 'श्रीमंत छ.उदयनराजे प्रतापसिंहमहाराज भोसले',

      // Local leadership
      sarpanch_en: 'Kausalya Laxman Shelar',
      sarpanch_mr: 'कौशल्या लक्ष्मण शेलर',
      sarpanch_hi: 'कौशल्या लक्ष्मण शेलर',

      // Geographic information
      mapLink: 'https://maps.app.goo.gl/Q6WzhrChjYEhK6Tm9',
      population: 439,
      literacyRate: 87.5,
      area: 12.4,
      establishedYear: 1850,

      // Demographics
      malePopulation: 225,
      femalePopulation: 214,
      otherPopulation: 0,
      totalHouses: 89,

      // Descriptive content
      description_en: 'Okhawadi is a beautiful village located in the Jawali taluka of Satara district, Maharashtra. Known for its rich cultural heritage and scenic beauty, the village is nestled in the Western Ghats.',
      description_mr: 'ओखवडी हे महाराष्ट्राच्या सातारा जिल्ह्यातील जावली तालुक्यातील एक सुंदर गाव आहे. त्याच्या संपन्न सांस्कृतिक वारसा आणि सुंदर दृश्यांसाठी ओळखले जाते.',
      description_hi: 'ओखवाडी महाराष्ट्र के सातारा जिले के जावली तालुका में स्थित एक सुंदर गाँव है। यह अपनी समृद्ध सांस्कृतिक विरासत और सुंदरता के लिए जाना जाता है।',

      history_en: 'The village of Okhawadi has a rich history dating back several centuries. Originally settled by agricultural communities, the village has evolved while maintaining its traditional values and cultural practices.',
      history_mr: 'ओखवडी गावाचा इतिहास अनेक शतकांपूर्वीचा आहे. मूळतः शेतीच्या समुदायांनी वसलेले हे गाव पारंपारिक मूल्ये आणि सांस्कृतिक प्रथा जपत विकसित झाले आहे.',
      history_hi: 'ओखवाडी गाँव का इतिहास कई शताब्दियों पुराना है। मूल रूप से कृषि समुदायों द्वारा बसाया गया, यह गाँव अपने पारंपरिक मूल्यों और सांस्कृतिक प्रथाओं को बनाए रखते हुए विकसित हुआ है।',

      culture_en: 'The culture of Okhawadi is deeply rooted in Maharashtrian traditions. The village celebrates various festivals with great enthusiasm and maintains a strong community spirit.',
      culture_mr: 'ओखवडीची संस्कृती महाराष्ट्राच्या परंपरांमध्ये खोलवर रुजलेली आहे. गावातील लोक विविध सण खूप उत्साहाने साजरे करतात आणि मजबूत सामुदायिक चेतना जपतात.',
      culture_hi: 'ओखवाडी की संस्कृति महाराष्ट्र की परंपराओं में गहराई से जड़ी हुई है। गाँव के लोग विभिन्न त्योहारों को बहुत उत्साह के साथ मनाते हैं और एक मजबूत सामुदायिक भावना बनाए रखते हैं।',

      climate_en: 'The village experiences a pleasant climate throughout the year with moderate rainfall during monsoon.',
      climate_mr: 'गावात वर्षभर अनुकूल हवामान अनुभवात येते आणि मॉन्सूनमध्ये मध्यम पाऊस होतो.',
      climate_hi: 'गाँव में वर्ष भर सुखद जलवायु होता है और मॉनसून के दौरान मध्यम वर्षा होती है।',

      grampanchayatContact_en: 'Gram Panchayat Okhawadi, Phone: +91-02378-XXXXXX',
      grampanchayatContact_mr: 'ओखवडी ग्रामपंचायत, दूरध्वनी: +९१-०२३७८-XXXXXX',
      grampanchayatContact_hi: 'ओखवाडी ग्राम पंचायत, फोन: +९१-०२३७८-XXXXXX',

      mainOccupation_en: 'Agriculture is the main occupation with crops like rice, jowar, and vegetables.',
      mainOccupation_mr: 'शेती हा मुख्य व्यवसाय असून तांदूळ, ज्वार आणि भाजीपाला ही मुख्य पिके आहेत.',
      mainOccupation_hi: 'कृषि मुख्य व्यवसाय है जिसमें चावल, ज्वार और सब्जियां मुख्य फसलें हैं।',

      festivals_en: 'Ganesh Chaturthi, Diwali, Makar Sankranti are the main festivals celebrated with great enthusiasm.',
      festivals_mr: 'गणेश चतुर्थी, दिवाळी, मकर संक्रांती हे मुख्य सण खूप उत्साहाने साजरे केले जातात.',
      festivals_hi: 'गणेश चतुर्थी, दिवाली, मकर संक्रांति मुख्य त्योहार हैं जो बहुत उत्साह के साथ मनाए जाते हैं।',

      // Infrastructure arrays
      schools: [
        {
          name_en: 'Zilla Parishad Primary School Okhawadi',
          name_mr: 'जिल्हा परिषद प्राथमिक शाळा ओखवडी',
          name_hi: 'जिला परिषद प्राथमिक विद्यालय ओखवाडी',
          type_en: 'Government Primary School',
          type_mr: 'सरकारी प्राथमिक शाळा',
          type_hi: 'सरकारी प्राथमिक विद्यालय'
        },
        {
          name_en: 'Mahatma Phule High School',
          name_mr: 'महात्मा फुले उच्च माध्यमिक शाळा',
          name_hi: 'महात्मा फुले हाई स्कूल',
          type_en: 'Government Secondary School',
          type_mr: 'सरकारी माध्यमिक शाळा',
          type_hi: 'सरकारी माध्यमिक विद्यालय'
        }
      ],

      hospitals: [
        {
          name_en: 'Primary Health Center Okhawadi',
          name_mr: 'प्राथमिक आरोग्य केंद्र ओखवडी',
          name_hi: 'प्राथमिक स्वास्थ्य केंद्र ओखवाडी',
          type_en: 'Government Health Facility',
          type_mr: 'सरकारी आरोग्य सुविधा',
          type_hi: 'सरकारी स्वास्थ्य सुविधा'
        }
      ],

      waterSources: [
        {
          name_en: 'Village Well',
          name_mr: 'गावाची विहीर',
          name_hi: 'गाँव का कुआँ'
        },
        {
          name_en: 'Borewell',
          name_mr: 'बोअरवेल',
          name_hi: 'बोरवेल'
        },
        {
          name_en: 'Water Pipeline',
          name_mr: 'पाणी टाकी',
          name_hi: 'पानी की टंकी'
        }
      ],

      // Empty slider images for admin to upload
      sliderImages: []
    });

    await villageInfo.save();

    // Create sample news
    const newsItems = [
      {
        title: 'ग्रामपंचायत चुनाव यशस्वीरित्या पार पडले',
        content: 'ओखवडी ग्रामपंचायतीचे निवडणूक यशस्वीरित्या पार पडल्या. नवीन सरपंच कौशल्या लक्ष्मण शेलर यांची निवड झाली आहे.',
        category: 'news',
        author: 'Gram Panchayat'
      },
      {
        title: 'गावात नवीन पाणीपुरवठा योजना सुरू',
        content: 'ओखवडी गावात नवीन पाणीपुरवठा योजनेचे उद्घाटन करण्यात आले. यामुळे गावातील लोकांना शुद्ध पिण्याच्या पाण्याची सोय होणार आहे.',
        category: 'development',
        author: 'Gram Panchayat'
      },
      {
        title: 'शाळेत नवीन संगणक प्रयोगशाळा सुरू',
        content: 'जिल्हा परिषद प्राथमिक शाळेत नवीन संगणक प्रयोगशाळा सुरू करण्यात आली. विद्यार्थ्यांसाठी हे एक महत्त्वापूर्ण पाऊल आहे.',
        category: 'education',
        author: 'School Management'
      }
    ];

    await News.insertMany(newsItems);

    // Create sample contacts
    const contacts = [
      {
        name: 'कौशल्या लक्ष्मण शेलर',
        position: 'सरपंच',
        department: 'ग्रामपंचायत',
        phone: '९८७६५४३२१०',
        email: 'sarpanch@okhawadi.in',
        order: 1
      },
      {
        name: 'दिपक रामू जाधव',
        position: 'गट विकास अधिकारी',
        department: 'विकास विभाग',
        phone: '९८७६५४३२११',
        email: 'gdo@okhawadi.in',
        order: 2
      },
      {
        name: 'रमेश शंकर पाटील',
        position: 'ग्रामसेवक',
        department: 'प्रशासन',
        phone: '९८७६५४३२१२',
        email: 'gramsevak@okhawadi.in',
        order: 3
      }
    ];

    await Contact.insertMany(contacts);

    console.log('Village data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding village data:', error);
    process.exit(1);
  }
};

seedVillageData();