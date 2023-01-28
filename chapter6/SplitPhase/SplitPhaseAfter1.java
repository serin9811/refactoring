package SplitPhase;

import java.io.IOException;

public class SplitPhaseAfter1 {
    public static void main(String[] args) {
        try {
            run(args); // 테스트 코드에서 쉽게 호출 할 수 있도록 접금 범위를 패키지로 정함 
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        }
    }

    static void run(String[] args) throws IOException {
        if(args.length == 0) throw new RuntimeException("파일명을 입력하세요.");
        String filename = args[args.length -1];
        File input = Paths.get(filename).toFile();
        ObjectMapper mapper = new ObjectMapper();
        Orders[] orders = mapper.readValue(input, Order[].class);

        if(Stream.of(arg).anyMatch(arg -> "-r".equals(arg)))
            System.out.println(Stream.of(orders).filter(o -> "ready".equals(o.status)).count());
        else System.out.println(orders.length);
    }
}
