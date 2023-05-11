import moment from "moment";
import ApplCourse from "../models/ApplCourseModel.js";
import ApplEducation from "../models/ApplEducationModel.js";
import ApplFamily from "../models/ApplFamilyModel.js";
import Applicants from "../models/ApplicantsModel.js";
import ApplQuestion from "../models/ApplQuestionModel.js";
import ApplContact from "../models/ApplContactModel.js";
import ApplExperience from "../models/ApplExperienceModel.js";
import ApplLanguage from "../models/ApplLanguageModel.js";

export const postResume = async (req, res) => {
  const data = req.body;

  const fileUpload = req.files?.photo[0] || req.files?.photo;
  if (fileUpload == null)
    return res.status(400).json({ msg: "file Not Found" });
  let fileName = `${moment().format("X")}.${fileUpload.name.split(".")[1]}`;
  fileUpload.mv(`./uploads/${fileName}`, (err) => {
    if (err) return res.status(500).send(err);
  });

  try {
    const Insert = await Applicants.create({ ...data, photo: fileName });
    return res.status(201).json({ msg: Insert });
  } catch (error) {
    if (error?.original) {
      const { code, sqlMessage } = error.original;
      res.status(400).json({ code, sqlMessage });
    } else {
      res.status(500).json({ error });
    }
  }
};

export const postEducation = async (req, res) => {
  const data = req.body;

  let pendidikan = [];
  let bahasa = [];
  let kursus = [];

  data.tingkat.forEach((element, index) => {
    pendidikan.push({
      appl_id: data.appl_id,
      tingkat: element,
      nama: data.nama[index],
      kota: data.kota[index],
      jurusan: data.jurusan[index],
      tahun_mulai: data.tahun_mulai[index],
      tahun_selesai: data.tahun_selesai[index],
      lulus: data.lulus[index],
    });
  });

  if (Array.isArray(data.tipe_kursus)) {
    for (let i = 0; i < data.tipe_kursus.length; i++) {
      const element = data.tipe_kursus[i];
      if (element == "") break;
      kursus.push({
        appl_id: data.appl_id,
        bidang: element,
        penyelenggara: data.penyelenggara[i],
        kota: data.kota_kursus[i],
        lama_kursus: data.lama_kursus[i],
        tahun: data.tahun_kursus[i],
        dibayar_oleh: data.bayar_kursus[i],
      });
    }
  }
  if (Array.isArray(data.macam_bahasa)) {
    for (let i = 0; i < data.macam_bahasa.length; i++) {
      if (data.macam_bahasa[i] == "") continue;
      bahasa.push({
        appl_id: data.appl_id,
        bahasa: data.macam_bahasa[i],
        speak: data.bicara_bahasa[i],
        listen: data.dengar_bahasa[i],
        write: data.tulis_bahasa[i],
        read: data.baca_bahasa[i],
      });
    }
  }

  //   console.log(pendidikan);
  //   return res.status(400).json({ msg: "file Not Found" });
  try {
    const Insert = await ApplEducation.bulkCreate(pendidikan);
    if (kursus.length > 0) await ApplCourse.bulkCreate(kursus);
    await ApplLanguage.bulkCreate(bahasa);
    await Applicants.update(
      {
        alasan_sekolah: data.alasan_jurusan,
        alasan_berhenti_sekolah: data.alasan_putus,
      },
      {
        where: {
          id: data.appl_id,
        },
      }
    );
    return res.status(201).json({ msg: Insert });
  } catch (error) {
    const { code, sqlMessage } = error.original;
    return res.status(401).json({ code, sqlMessage });
  }
};

export const postFamily = async (req, res) => {
  const data = req.body;

  console.log(data);
  let family = [];
  let cont = [];

  if (Array.isArray(data.hubungan)) {
    for (let i = 0; i < data.hubungan.length; i++) {
      if (data.nama_keluarga[i] == "") continue;
      family.push({
        appl_id: data.appl_id,
        hubungan: data.hubungan[i],
        nama: data.nama_keluarga[i],
        gender: data.gender[i],
        usia: data.usia[i],
        pendidikan: data.pendidikan[i],
        jabatan: data.jabatan[i],
        perusahaan: data.perusahaan[i],
      });
    }
  }

  if (Array.isArray(data.cont_nama)) {
    for (let i = 0; i < data.cont_nama.length; i++) {
      if (data.nama_keluarga[i] == "") continue;
      cont.push({
        appl_id: data.appl_id,
        nama: data.cont_nama[i],
        alamat_or_kegiatan: data.cont_alamat[i],
        jabatan: data.cont_jabatan[i],
        hubungan: data.cont_hubungan[i],
        tipe: data.tipe[i],
      });
    }
  }

  try {
    const Insert = await ApplFamily.bulkCreate(family);
    await ApplContact.bulkCreate(cont);
    res.status(201).json({ msg: Insert });
  } catch (error) {
    const code = error?.original?.code || null;
    const sqlMessage = error?.original?.sqlMessage || null;
    res.status(400).json({ msg: code, msg: sqlMessage, error });
  }
};

export const postExp = async (req, res) => {
  const data = req.body;

  // console.log(data);
  // return;
  let family = [];

  // if (Array.isArray(data.hubungan)) {
  for (let i = 0; i < data.nama_perusahaan.length; i++) {
    if (data.nama_perusahaan[i] == "") continue;
    family.push({
      appl_id: data.appl_id,
      nama: data.nama_perusahaan[i],
      start: moment(data.mulai.split(",")[i]).format("YYYY-MM-DD"),
      end: moment(data.sampai.split(",")[i]).format("YYYY-MM-DD"),
      position: data.jabatan[i],
      position_end: data.jabatan_akhir[i],
      jenis_usaha: data.jenis_usaha[i],
      nama_pemilik: data.nama_pemilik[i],
      atasan_langsung: data.atasan_langsung[i],
      jumlah_karyawan: data.jumlah_karyawan[i],
      no_telp: data.telp[i],
      tugas: data.tugas[i],
      gaji: data.gapok[i],
      tunjangan_1: data.tuntep[i],
      tunjangan_2: 0,
      tunjangan_3: 0,
      tunjangan_a: data.tuntitep[i],
      tunjangan_b: 0,
      tunjangan_c: 0,
      take_home_pay: data.thp[i],
      berhenti: data.alasan[i],
    });
  }
  // }

  try {
    const Insert = await ApplExperience.bulkCreate(family);
    res.status(201).json({ msg: Insert });
  } catch (error) {
    const code = error?.original?.code || null;
    const sqlMessage = error?.original?.sqlMessage || null;
    res.status(400).json({ msg: code, msg: sqlMessage, error });
  }
};

export const postQuestion = async (req, res) => {
  const data = req.body;

  try {
    const Insert = await ApplQuestion.create(data);
    res.status(201).json({ msg: Insert });
  } catch (error) {
    const code = error?.original?.code || null;
    const sqlMessage = error?.original?.sqlMessage || null;
    res.status(400).json({ msg: code, msg: sqlMessage, error });
  }
};

export const getResume = async (req, res) => {
  const user = await Applicants.findAll({ limit: 10, offset: 0 });

  // // console.log(user.toJSON());
  // user.map((e) => {
  //   console.log(e.nama);
  // });
  res.status(200).json({ data: user });
};

export const getDetails = async (req, res) => {
  const user = await Applicants.findByPk(req.params.id, {
    include: [
      "contact",
      "course",
      "education",
      "experience",
      "family",
      "language",
      "question",
    ],
  });
  res.status(200).json({ data: user });
};
