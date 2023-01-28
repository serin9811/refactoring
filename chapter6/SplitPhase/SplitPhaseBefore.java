package SplitPhase;

public class SplitPhaseBefore {
    public static void main(String[] args) {
        try {
            if(args.length == 0) throw new RuntimeException("파일명을 입력하세요");
            String filename = args[args.length -1];
            File input = Paths.get(filename).toFile();
            ObjectMapper mapper = new ObjectMapper();
            Orders[] orders = mapper.readValue(input, Order[].class);
            
            if(Stream.of(args).anyMatch(arg -> "-r".equals(arg))) // 인수를 분석한다
                System.out.println(Stream.of(orders).filter(o -> "ready".equals(o.status)).count()); // 주문 목록을 읽어 갯수를 센다
            else
                System.out.println(orders.length); 
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        }
    }
}

