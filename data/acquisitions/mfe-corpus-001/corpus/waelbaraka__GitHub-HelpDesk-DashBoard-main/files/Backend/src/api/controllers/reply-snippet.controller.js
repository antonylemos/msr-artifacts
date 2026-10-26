import * as snippetService from '../services/reply-snippet.service.js';
import { ApiError } from '../utils/ApiError.js';

export const create = async (req, res, next) => {
    try {
        const { organizationId, id: agentId } = req.user;
        const newSnippet = await snippetService.createSnippet(organizationId, agentId, req.body);
        res.status(201).json(newSnippet);
    } catch (error) { next(error); }
};

export const list = async (req, res, next) => {
    try {
        const { organizationId, id: agentId, teamId } = req.user;
        const { q } = req.query; // q for search query

        let snippets;
        if (q) {
            snippets = await snippetService.searchSnippets(organizationId, agentId, teamId, q);
        } else {
            snippets = await snippetService.listAllSnippets(organizationId);
        }
        res.status(200).json(snippets);
    } catch (error) { next(error); }
};

export const update = async (req, res, next) => {
    try {
        const { organizationId, id: agentId } = req.user;
        const { snippetId } = req.params;
        const updatedSnippet = await snippetService.updateSnippet(parseInt(snippetId), organizationId, agentId, req.body);
        res.status(200).json(updatedSnippet);
    } catch (error) { next(error); }
};

export const remove = async (req, res, next) => {
    try {
        const { organizationId } = req.user;
        const { snippetId } = req.params;
        await snippetService.deleteSnippet(parseInt(snippetId), organizationId);
        res.status(204).send();
    } catch (error) { next(error); }
};