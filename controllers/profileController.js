
import Profile from "../models/Profile.js"

import { validationResult } from "express-validator";


export const fetch = async (req, res) => {
  try {

    const profile = await Profile.findOne({
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json({success: true, data: profile});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params
    const {
      company_name,
      email,
      phone,
      mobile,
      address_line_1,
      address_line_2,
      address_line_3,
      po_box,
      website,
      tagline
    } = req.body;
    
    const profile = await Profile.findOne({where: { id: id }});

    if (profile) {
      profile.company_name = company_name;
      profile.email = email;
      profile.phone = phone;
      profile.mobile = mobile;
      profile.address_line_1 = address_line_1;
      profile.address_line_2 = address_line_2;
      profile.address_line_3 = address_line_3;
      profile.po_box = po_box;
      profile.website = website;
      profile.tagline = tagline;

      await profile.save();

      res.status(200).json({ success: true, data: profile, message: 'Profile has been updated'});
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};