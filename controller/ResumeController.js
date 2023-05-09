import moment from "moment";
import ApplCourse from "../models/ApplCourseModel.js";
import ApplEducation from "../models/ApplEducationModel.js";
import ApplFamily from "../models/ApplFamilyModel.js";
import Applicants from "../models/ApplicantsModel.js";

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

  //   console.log(pendidikan);
  //   return res.status(400).json({ msg: "file Not Found" });
  try {
    const Insert = await ApplEducation.bulkCreate(pendidikan);
    if (kursus.length > 0) await ApplCourse.bulkCreate(kursus);
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

  let family = [];

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

  try {
    const Insert = await ApplFamily.bulkCreate(family);
    // if (kursus.length > 0) await ApplCourse.bulkCreate(kursus);
    // await Applicants.update(
    //   {
    //     alasan_sekolah: data.alasan_jurusan,
    //     alasan_berhenti_sekolah: data.alasan_putus,
    //   },
    //   {
    //     where: {
    //       id: data.appl_id,
    //     },
    //   }
    // );
    res.status(201).json({ msg: Insert });
  } catch (error) {
    const code = error?.original?.code || null;
    const sqlMessage = error?.original?.sqlMessage || null;
    res.status(400).json({ msg: code, msg: sqlMessage, error });
  }
};
