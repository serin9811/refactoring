package SplitPhase;

import java.io.IOException;

public class SplitPhaseAfter2 {
    public static void main(String[] args) {
        try {
            System.out.println(run(args));
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        }
    }

    // 0. 테스트가 느리거나 불편하면 리팩토링 속도가 느려지고 오류의 단계는 리팩터링 시 중요하다.
    static long run(String[] args) throws IOException {
        if(args.length == 0) throw new RuntimeException("파일명을 입력하세요");
        String filename = args[args.length -1];
        File input = Paths.get(filename).toFile();
        ObjectMapper mapper = new ObjectMapper();
        Order[] orders = mapper.readValue(input, Order[].class);
        if(Stream.of(args).anyMatch(arg -> "-r".equals(arg)))
            return Stream.of(orders).filter(o -> "ready".equals(o.status)).count();
        else 
            return orders.length;
    }
}
