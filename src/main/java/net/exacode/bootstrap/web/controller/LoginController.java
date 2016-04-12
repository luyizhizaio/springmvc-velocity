package net.exacode.bootstrap.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * User: humingming
 * Date: 15-11-6
 * Time: 下午3:52
 */
@Controller
@RequestMapping("/login")
public class LoginController {

    private String vmLoginPath = "login/";

    /**
     * 登陆页
     *
     * @return
     */
    @RequestMapping(value = "index")
    public String index() {
        String result = vmLoginPath.concat("index");
        return result;
    }

    /**
     * 登陆处理
     *
     * @param response
     * @return
     */
   /* @RequestMapping(value = "login", method = RequestMethod.POST)
    public @ResponseBody JsonResponse login(HttpServletResponse response, String uname, String upwd) {
        JsonResponse result = new JsonResponse("fail");
        try{
            if(UserConstants.ADMIN_PASSPORT.equals(uname) && UserConstants.ADMIN_PASSWORD.equals(upwd)){
                Map<String, String> cookieMap = Maps.newHashMap();
                cookieMap.put("ecpassport", UserConstants.ADMIN_PASSPORT);
                cookieMap.put("ecpassword", UserConstants.ADMIN_PASSWORD);
                CookieUtil.setCookies(response, true, cookieMap);
                result = new JsonResponse("success");
            }
        }catch(Exception e){
            result = new JsonResponse("fail");
            return result;
        }
        return result;
    }*/

    /**
     * 登出处理
     *
     * @param request
     * @param response
     * @return
     */
   /* @RequestMapping(value = "logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        CookieUtil.cleanCookies(request, response);
        String result = vmLoginPath.concat("index");
        return result;
    }*/
}
