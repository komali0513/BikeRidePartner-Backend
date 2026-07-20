const express = require("express");
const router = express.Router();
const db = require("../db");
const upload = require("../middleware/upload");

// =============================
// Create User
// =============================
router.post("/", (req, res) => {
  const { mobile } = req.body;

  const sql = `
    INSERT INTO users (mobile)
    VALUES (?)
  `;

  db.query(sql, [mobile], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      message: "User Created",
      userId: result.insertId,
    });
  });
});

// =============================
// Update Documents
// =============================
router.put(
  "/:id/documents",
  upload.fields([
    { name: "driving_license", maxCount: 1 },
    { name: "aadhaar_card", maxCount: 1 },
    { name: "pan_card", maxCount: 1 },
    { name: "rc_book", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "pollution_certificate", maxCount: 1 },
  ]),
  (req, res) => {
    const { id } = req.params;

    const files = req.files;

    const driving_license = files.driving_license
      ? "uploads/" + files.driving_license[0].filename
      : null;

    const aadhaar_card = files.aadhaar_card
      ? "uploads/" + files.aadhaar_card[0].filename
      : null;

    const pan_card = files.pan_card
      ? "uploads/" + files.pan_card[0].filename
      : null;

    const rc_book = files.rc_book
      ? "uploads/" + files.rc_book[0].filename
      : null;

    const insurance = files.insurance
      ? "uploads/" + files.insurance[0].filename
      : null;

    const pollution_certificate = files.pollution_certificate
      ? "uploads/" + files.pollution_certificate[0].filename
      : null;

    const sql = `
      UPDATE users
      SET
        driving_license=?,
        aadhaar_card=?,
        pan_card=?,
        rc_book=?,
        insurance=?,
        pollution_certificate=?
      WHERE id=?
    `;

    db.query(
      sql,
      [
        driving_license,
        aadhaar_card,
        pan_card,
        rc_book,
        insurance,
        pollution_certificate,
        id,
      ],
      (err) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        res.json({
          success: true,
          message: "Documents Uploaded Successfully",
        });
      },
    );
  },
);

// =============================
// Update Selfie
// =============================
router.put("/:id/selfie", upload.single("selfie"), (req, res) => {
  const { id } = req.params;

  const selfie = req.file ? "uploads/" + req.file.filename : null;

  const sql = `
      UPDATE users
      SET selfie=?
      WHERE id=?
    `;

  db.query(sql, [selfie, id], (err) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    res.json({
      success: true,
      message: "Selfie Uploaded Successfully",
    });
  });
});

// =============================
// Update Bank Details
// =============================
router.put("/:id/bank-details", (req, res) => {
  const { id } = req.params;

  const { bank_name, account_holder_name, account_number, ifsc_code } =
    req.body;

  const sql = `
    UPDATE users
    SET
      bank_name=?,
      account_holder_name=?,
      account_number=?,
      ifsc_code=?
    WHERE id=?
  `;

  db.query(
    sql,
    [bank_name, account_holder_name, account_number, ifsc_code, id],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Bank Details Updated",
      });
    },
  );
});

// =============================
// Update Vehicle Details
// =============================
router.put("/:id/vehicle-details", upload.single("bike_photo"), (req, res) => {
  const { id } = req.params;

  const { bike_brand, bike_model, bike_year, registration_number } = req.body;

  const bike_photo = req.file ? "uploads/" + req.file.filename : null;

  const sql = `
      UPDATE users
      SET
        bike_brand=?,
        bike_model=?,
        bike_year=?,
        registration_number=?,
        bike_photo=?
      WHERE id=?
    `;

  db.query(
    sql,
    [bike_brand, bike_model, bike_year, registration_number, bike_photo, id],
    (err) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      res.json({
        success: true,
        message: "Vehicle Details Updated",
      });
    },
  );
});

module.exports = router;
