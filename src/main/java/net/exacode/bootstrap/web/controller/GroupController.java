package net.exacode.bootstrap.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created with IntelliJ IDEA.
 * User: yinguanqun
 * Date: 2015/11/30
 * Time: 17:12
 * To change this template use File | Settings | File Templates.
 */
@Controller
@RequestMapping("/group")
public class GroupController {

    private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

    private String vmRootPath = "group/";



    @RequestMapping(value = "add")
    public String add(ModelMap model) {
       /* model.put("length", getEcSize());*/
        return vmRootPath.concat("add");
    }

  /*  @RequestMapping(value = "save", method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse save(GroupRequest request) {
        if (!validPath(request)) {
            return JsonResponse.buildResponse(GroupResponseCode.PARAM_PATH_ERROR);
        }
        if (!validName(request)) {
            return JsonResponse.buildResponse(GroupResponseCode.PARAM_NAME_ERROR);
        }
        try {
            return groupService.createGroup(request);
        } catch (Exception e) {
            logger.error("exception occurred when saving group, the request={}||exception=", request, e);
            JsonResponse result = JsonResponse.buildResponse(GroupResponseCode.FAIL);
            result.setMsg(e.getMessage());
            return result;
        }
    }*/

   /* @RequestMapping(value = "modify", method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse modify(String oldgname, String oldgpath, String gname, String gpath) {
        GroupRequest oldGroup = new GroupRequest(oldgname, oldgpath, oldgpath);
        GroupRequest newGroup = new GroupRequest(gname, gpath, gpath);
        if (!validName(newGroup)) {
            return JsonResponse.buildResponse(GroupResponseCode.PARAM_NAME_ERROR);
        }
        try {
            return groupService.updateGroup(oldGroup, newGroup);
        } catch (Exception e) {
            logger.error("exception occurred when updating group, the request={}||exception=", oldGroup.toString(), e);
            JsonResponse result = JsonResponse.buildResponse(GroupResponseCode.FAIL);
            result.setMsg(e.getMessage());
            return result;
        }
    }*/

   /* @RequestMapping(value = "remove", method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse remove(String gpath) {
        try {
            return groupService.removeGroup(gpath);
        } catch (Exception e) {
            logger.error("exception occurred when removing group, the path={}||exception=", gpath, e);
            JsonResponse result = JsonResponse.buildResponse(GroupResponseCode.FAIL);
            result.setMsg(e.getMessage());
            return result;
        }
    }*/

    @RequestMapping(value = "list")
    public String list(ModelMap model) {
       /* List<MenuVO> group = new ArrayList<MenuVO>();
        try {
            JsonResponse result = groupService.queryAllGroup();
            group = (List<MenuVO>) result.getData();
        } catch (Exception e) {
            logger.error("exception occurred when query all group, exception=",  e);
        }
        model.put("length", getEcSize());
        model.put("group", group);*/
        return vmRootPath.concat("list");
    }

    /*private static boolean validPath(GroupRequest request) {
        String regex = "^[a-zA-Z0-9]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(request.getPath());
        if (matcher.matches())
            return true;
        else
            return false;
    }

    private static boolean validName(GroupRequest request) {
        String regex = "^[\\u4e00-\\u9fa5a-zA-Z0-9，。、！？（）《》【】@]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(request.getName());
        if (matcher.matches())
            return true;
        else
            return false;
    }

    private int getEcSize(){
        return ECodeController.EC_SIZE;
    }*/

}
