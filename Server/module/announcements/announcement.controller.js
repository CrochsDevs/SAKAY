// server/module/announcements/announcement.controller.js
import AnnouncementModel from "./announcement.model.js";

export const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await AnnouncementModel.findAll();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createAnnouncement = async (req, res) => {
    try {
        const { title, content, priority } = req.body;
        const announcementData = {
            title,
            content,
            priority,
            authorId: req.user._id,
            authorName: req.user.fullName
        };
        const newAnnouncement = await AnnouncementModel.create(announcementData);
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, priority } = req.body;
        await AnnouncementModel.updateById(id, { title, content, priority });
        res.status(200).json({ message: "Announcement updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        await AnnouncementModel.deleteById(id);
        res.status(200).json({ message: "Announcement deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};