const conn = require('/home/lviors/absensi/config/database.js')

module.exports = app => {
    const jwt = require('./middleware/jwt.js');
    const webatt = require('./routes/webadmin/att.js');
    const webuser = require('./routes/webadmin/user.js');
    const izin = require('./routes/webadmin/izin.js');
    const rpt = require('./routes/webadmin/report.js');
    const group = require('./routes/webadmin/group.js');
    const cabang = require('./routes/webadmin/cabang.js');
    const admin = require('./routes/webadmin/admin.js');
    const pengumuman = require('./routes/webadmin/pengumuman.js');

    const user = require("./routes/app/user.js");
    const att = require("./routes/app/att.js");
    const report = require("./routes/app/report.js");


    // -- WEB ADMIN ROUTES
    app.post("/api/login", webuser.login);

    // pengumuman
    // app.get("/api/nlpengumuman", pengumuman.all);
    // app.get("/api/nlpengumuman/detail/:id", pengumuman.detail);
    app.get("/api/pengumuman", pengumuman.all);
    app.get("/api/pengumuman/detail/:id",  pengumuman.detail);
    
    app.post("/api/pengumuman/save", jwt.authenticateToken, pengumuman.save);
    app.get("/api/pengumuman/lscabang/:id/:detail", jwt.authenticateToken, pengumuman.lsCabang);
    app.get("/api/pengumuman/lsgroup/:id/:detail", jwt.authenticateToken, pengumuman.lsGroup);

    // Seluruh List User di web admin
    app.get("/api/user", jwt.authenticateToken, webuser.allUser);
    // detail user untuk form
    app.get("/api/user/:id", jwt.authenticateToken, webuser.detailUser);
    //Tambahkan data user baru untuk panel admin
    app.post("/api/user", jwt.authenticateToken, webuser.newUser);
    // update data user
    app.put("/api/user/:id", jwt.authenticateToken, webuser.editUser);
    // delete user
    app.delete("/api/user/:id", jwt.authenticateToken, webuser.deleteUser);

    // reset device
    app.put("/api/resetdevice/:id", jwt.authenticateToken, webuser.resetDevice);
    // reset password user
    app.put("/api/resetpassworduser/:id", jwt.authenticateToken, webuser.resetPassword);

    // table header laporan
    app.get("/api/headerlaporan/:id", rpt.headerLaporan);
    // table body laporan
    app.get("/api/laporandetail/:id&:TglAwal&:TglAkhir", rpt.laporanDetail);
    // table footer laporan
    app.get("/api/laporanrekap/:id&:TglAwal&:TglAkhir", rpt.laporanRekap);
    
    // report tidak lengkap
    app.get("/api/laporantidaklengkap/:id&:TglAwal&:TglAkhir&:Nama", rpt.laporanTidakLengkap);

    app.post("/api/cekbelumpulangtoday", jwt.authenticateToken, izin.checkBelumLengkapToday);
    
    // get izin list
    app.get("/api/izin", jwt.authenticateToken, izin.getIzin);
    // list izin solo
    app.get("/api/izinsolo/:id&:TglAwal&:TglAkhir", jwt.authenticateToken, izin.izinSolo);
    // new izin atau data absen
    app.post("/api/izin", jwt.authenticateToken, izin.newIzin);
    //edit izin atau data absen
    app.put("/api/izin/:id", jwt.authenticateToken, izin.updateIzin);
    // tampilkan data izin yang sudah diterima berdasakan id
    app.get("/api/izin/:id", jwt.authenticateToken, izin.getIzinId);
    // tampilkan detail data absensi berdasarkan DatangID
    app.get("/api/detailabsensi/:id", jwt.authenticateToken, izin.getDetailAbsensi);
    
    app.post("/api/izingroup", jwt.authenticateToken, izin.newIzinGroup);

    app.delete("/api/izin/:id", jwt.authenticateToken, izin.deleteIzin);
    
    // masuk manual
    app.post("/api/attlogmanual", webatt.masukManual);
    // pulang manual
    app.put("/api/datangmanual/:id", webatt.pulangManual);
    // keluar manual
    app.post("/api/keluarkantormanual", webatt.keluarManual);
    // kembali manual
    app.put("/api/keluarkantormanual/:id", webatt.kembaliManual);
    // istrahat keluar
    app.put("/api/istirahatmanual/:id", webatt.istirahatManual);
    // istirahat kembali
    app.put("/api/istirahatkembalimanual/:id", webatt.istirahatKembaliManual);

    
    app.get("/api/cekuserafterfinger/:id/:action", webatt.cekUserAfterFinger);

    app.get("/api/optusermanual", webatt.optUserMasukManual);
    app.get("/api/optusermanualpulang", webatt.optUserPulangManual);
    app.get("/api/optusermanualkeluar", webatt.optUserKeluarManual);
    app.get("/api/optusermanualkembali", webatt.optUserKembaliManual);
    app.get("/api/optusermanualkeluarist", webatt.optUserIstirahatKeluarManual);
    app.get("/api/optusermanualkembaliist", webatt.optUserIstirahatKembaliManual);

    // semua data admin
    app.get("/api/superadmin", jwt.authenticateToken, admin.allAdmin);

    app.get("/api/superadmin/:id", jwt.authenticateToken, admin.detailAdmin);
    app.post("/api/superadmin", jwt.authenticateToken, admin.newAdmin);
    app.put("/api/superadmin/:id", jwt.authenticateToken, admin.editAdmin);
    app.delete("/api/superadmin/:id", jwt.authenticateToken, admin.deleteAdmin);

    // semua cabang
    app.get("/api/cabang", jwt.authenticateToken, cabang.allCabang);
    // detail cabang
    app.get("/api/cabang/:id", jwt.authenticateToken, cabang.detailCabang);
    // add cabang
    app.post("/api/cabang", jwt.authenticateToken, cabang.newCabang);
    // edit cabang
    app.put("/api/cabang/:id", jwt.authenticateToken, cabang.editCabang);
    // hapus cabang
    app.delete("/api/cabang/:id", jwt.authenticateToken, cabang.hapusCabang);

    // menampilkan semua list group
    app.get("/api/group", jwt.authenticateToken, group.allGroup);
    // detail group per Pegawai
    app.get("/api/group/:id", jwt.authenticateToken, group.detailGroup);
    // add group karyawan
    app.post("/api/group", jwt.authenticateToken, group.newGroup);
    // edit group karyawan
    app.put("/api/group/:id", jwt.authenticateToken, group.editGroup);
    // delete group
    app.delete("/api/group/:id", jwt.authenticateToken, group.deleteGroup);

    // get terlambatbertingkat detail  by GroupID
    app.get("/api/TerlambatBertingkat/:id", jwt.authenticateToken, group.getTerlambatBertingkat);
    // get terlambatbertingkat detail 2 by RuleTerlambatBertingkatID
    app.get("/api/TerlambatBertingkat2/:id", jwt.authenticateToken, group.getTerlambatBertingkat2);
    // salin rule ke Group lain
    app.post("/api/SalinTerlambatBertingkat", jwt.authenticateToken, group.salinTerlambatBertingkat);
    // tambah rule terlambatbertingkat
    app.post("/api/TerlambatBertingkat", jwt.authenticateToken, group.newTerlambatBertingkat);
    // edit rule terlambatbertingkat
    app.put("/api/TerlambatBertingkat/:id", jwt.authenticateToken, group.editTerlambatBertingkat);
    // hapus rule terlambatbertingkat
    app.delete("/api/TerlambatBertingkat/:id", jwt.authenticateToken, group.hapusTerlambatBertingkat);

  
    //////////////////////////// --  APP ROUTES -- /////////////////////////////////////////
    // Login 
    app.post("/api/logindev", user.login);
    // test
    app.get("/api/getuser", jwt.authenticateToken, user.getUser);
    
    app.use("/app", jwt.authenticateToken);
    // get list all user
    app.get("/app/user", user.getAllUser);
    // get user profile
    app.get("/app/user/:id", user.getUser);
    // update user
    app.put("/app/user/:id", user.updateUser);

    // gettime untuk proses scan masuk, keluar, 
    app.get("/app/gettime/:id", att.getTime);
    // scan masuk
    app.post("/app/attlog", att.scanMasuk);
    // set keterangan
    app.put("/app/attlog/keterangan/:id", att.setScanMasukKeterangan);
    // get Datang ID
    app.get("/app/attlog/datang/:id", att.getDatangID);
    // scan pulang
    app.put("/app/attlog/pulang/:id", att.scanPulang);

    // keluar kantor
    app.post("/app/keluarkantor", att.keluarKantor);
    // get data keluarkantor
    app.get("/app/keluarkantor/:id", att.getKeluarKantor);
    // kembali kantor
    app.put("/app/keluarkantor/:id", att.kembaliKantor);

    // istrhat keluar
    app.put("/app/istirahatkeluar/:id", att.istirahatKeluar);
    // istrhat kembali
    app.put("/app/istirahatkembali/:id", att.istirahatKembali);
    
    //sync log
    app.post("/app/log", att.addLog);

    // report
    app.get("/app/reportbulan/:id", report.reportBulan);
    app.get("/app/reporttahun/:id", report.reportTahun);

    // list scan per hari
    app.get("/app/listscanperhari", report.listScanPerHari);

    app.get("/app/lp/:id", report.lp);
    app.get("/app/laporan2/:id", report.laporan2);
    app.get("/app/applaporan/:id", report.appLaporan);

    app.get("/app/pengumuman", report.listPengumuman);
    app.get("/app/pengumuman/q/:key", report.cariPengumuman);
    
};