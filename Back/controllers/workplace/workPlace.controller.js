const Workplace = require("../../models/workPlace.model");
const mongoose = require('mongoose');


const createWorkplace = async (req, res) => {
  const {name , collaborators = [] , collections = []} = req.body
  const { id } = req.user
    try {
      const workplace = new Workplace({
        name,
        creator: id,
        collaborators,
        collections
      });
      const savedWorkplace = await workplace.save();
      res.status(201).json(savedWorkplace);
    } catch (error) {
      res.status(500).json({ message: 'Error creating workplace', error });
    }
  };

const updateWorkplace = async (req, res) => {
    try {
      const updatedWorkplace = await Workplace.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedWorkplace) return res.status(404).json({ message: 'Workplace not found' });
      res.status(200).json(updatedWorkplace);
    } catch (error) {
      res.status(500).json({ message: 'Error updating workplace', error });
    }
  };


  const getWorkPlaces = async (req , res , next) => {
    try {
      const {id} = req.user;
      const workplaces = await Workplace.find({creator:mongoose.Schema.Types.ObjectId(id)}).lean()
      res.status(200).json({workplaces , message : "Workplaces recieved"});
    } catch (error) {
      res.status(400).json({error , message : "error"});
      
    }
  }


  module.exports = {createWorkplace , updateWorkplace , getWorkPlaces}