// src/api/controllers/tag.controller.js
import * as tagService from '../services/tag.service.js';
import * as userService from '../services/user.service.js';

export const create = async (req, res, next) => {
  try {
    const { organizationId, id: agentId } = req.user;
    const newTag = await tagService.createTag(organizationId, agentId, req.body);
    res.status(201).json(newTag);
  } catch (error) { next(error); }
};

export const list = async (req, res, next) => {
  console.log(`%c[CONTROLLER] Handling GET /api/tags with query:`, 'color: purple;', req.query);
  try {
    const { organizationId, id: agentId } = req.user;
    const { teamIds: teamIdsQuery } = req.query;

    let targetTeamIds;

    if (teamIdsQuery) {
      targetTeamIds = teamIdsQuery.split(',').map(id => parseInt(id.trim(), 10));
      console.log(`[CONTROLLER] -> Filtering by specific team IDs:`, targetTeamIds);
    } else {
      console.log(`[CONTROLLER] -> No teamIds provided, fetching for current agent: ${agentId}`);
      const agentTeams = await userService.getUserTeams(agentId);
      targetTeamIds = agentTeams.map(team => team.id);
      console.log(`[CONTROLLER] -> Found agent belongs to team IDs:`, targetTeamIds);
    }

    const tags = await tagService.listTagsForAgent(organizationId, targetTeamIds);
    console.log(`%c[CONTROLLER] listTagsForAgent service returned ${tags.length} tags. Responding with 200 OK.`, 'color: green;');
    res.status(200).json(tags);
  } catch (error) {
    console.error("[CONTROLLER ERROR] list tags failed.");
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { tagId } = req.params;
    const updatedTag = await tagService.updateTag(parseInt(tagId), organizationId, req.body);
    res.status(200).json(updatedTag);
  } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
  try {
    const { organizationId } = req.user;
    const { tagId } = req.params;
    const success = await tagService.deleteTag(parseInt(tagId), organizationId);
    if (!success) return res.status(404).json({ message: "Tag not found." });
    res.status(204).send();
  } catch (error) { next(error); }
};