/**
 * CloudFront Function: thingswell-root-to-ko
 *
 * 목적:
 *   루트 URL(/) 접속 시 /ko 로 301 리다이렉트합니다.
 *   카카오 OG 크롤러, 검색엔진 봇, 일반 사용자 모두 /ko 로 안내됩니다.
 *
 * 동작:
 *   - request.uri가 "/" 또는 ""일 때만 301 redirect → /ko
 *   - Host 헤더를 그대로 사용하여 www.thingswell.co.kr / thingswell.co.kr 유지
 *   - 쿼리스트링이 있으면 그대로 유지
 *   - /ko, /en 등 기존 경로는 리다이렉트하지 않고 그대로 통과
 *
 * 이벤트 타입: viewer-request
 * 런타임: cloudfront-js-2.0
 *
 * 적용 대상:
 *   Distribution ID: EQTMTY6FNARD8
 *   DefaultCacheBehavior → Viewer Request
 */
function handler(event) {
    var request = event.request;
    var host = request.headers.host.value;
    var uri = request.uri;

    // 루트 경로일 때만 /ko로 리다이렉트
    if (uri === '/' || uri === '') {
        var location = 'https://' + host + '/ko';

        // 쿼리스트링 유지
        if (request.querystring && Object.keys(request.querystring).length > 0) {
            var params = [];
            for (var key in request.querystring) {
                if (request.querystring[key].value) {
                    params.push(key + '=' + request.querystring[key].value);
                } else {
                    params.push(key);
                }
            }
            if (params.length > 0) {
                location += '?' + params.join('&');
            }
        }

        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers: {
                location: { value: location },
                'cache-control': { value: 'max-age=3600' }
            }
        };
    }

    // 그 외 경로는 그대로 통과
    return request;
}
