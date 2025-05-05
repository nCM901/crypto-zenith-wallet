
import { useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "@/components/Layout/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema
const withdrawFormSchema = z.object({
  address: z.string().min(26, {
    message: "Wallet address must be valid.",
  }),
  amount: z.string().refine((val) => {
    const num = Number(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Amount must be greater than 0.",
  }),
});

export default function WithdrawPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
  const { toast } = useToast();
  
  // Form setup
  const form = useForm<z.infer<typeof withdrawFormSchema>>({
    resolver: zodResolver(withdrawFormSchema),
    defaultValues: {
      address: "",
      amount: "",
    },
  });
  
  // Mock wallet balances
  const walletBalances = {
    bitcoin: { amount: 0.5, symbol: "BTC" },
    ethereum: { amount: 3.2, symbol: "ETH" },
    usdc: { amount: 395.5, symbol: "USDC" },
  };

  const cryptocurrencies = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      color: "bg-crypto-orange",
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      color: "bg-crypto-blue",
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      icon: "$",
      color: "bg-crypto-green",
    },
  ];

  function onSubmit(values: z.infer<typeof withdrawFormSchema>) {
    // Here you would send the withdrawal request to your API
    toast({
      title: "Withdrawal initiated!",
      description: `Withdrawing ${values.amount} ${walletBalances[selectedCrypto as keyof typeof walletBalances].symbol} to ${values.address.substring(0, 6)}...${values.address.substring(values.address.length - 4)}`,
    });
    
    // Reset form
    form.reset();
  }

  return (
    <PageContainer
      title="Withdraw"
      headerClassName="mb-4"
    >
      <div className="px-4 pb-6">
        <Button variant="ghost" size="sm" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        
        <h2 className="text-2xl font-bold mb-2">Withdraw Crypto</h2>
        <p className="text-muted-foreground mb-6">
          Send your cryptocurrency to an external wallet
        </p>
        
        <Tabs
          defaultValue="bitcoin"
          onValueChange={(value) => setSelectedCrypto(value)}
          className="w-full"
        >
          <TabsList className="w-full mb-6">
            {cryptocurrencies.map((crypto) => (
              <TabsTrigger key={crypto.id} value={crypto.id} className="flex-1">
                {crypto.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {cryptocurrencies.map((crypto) => (
            <TabsContent key={crypto.id} value={crypto.id} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className={`${crypto.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4`}>
                      {crypto.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{crypto.name}</h3>
                      <p className="text-muted-foreground">
                        Balance: {walletBalances[crypto.id as keyof typeof walletBalances].amount} {crypto.symbol}
                      </p>
                    </div>
                  </div>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient Address</FormLabel>
                            <FormControl>
                              <Input placeholder={`Enter ${crypto.name} address`} {...field} />
                            </FormControl>
                            <FormDescription>
                              Make sure to double-check the address before sending.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type="number"
                                  step="any"
                                  placeholder="0.00"
                                  {...field}
                                />
                                <div className="absolute right-3 top-2.5 text-sm font-medium text-gray-500">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </FormControl>
                            <div className="flex justify-between text-xs mt-1">
                              <FormDescription>
                                Network Fee: ~0.0005 {crypto.symbol}
                              </FormDescription>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-xs text-primary"
                                onClick={() => {
                                  form.setValue('amount', String(walletBalances[crypto.id as keyof typeof walletBalances].amount));
                                }}
                              >
                                MAX
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="bg-secondary p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Summary</h4>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Amount</span>
                          <span>{form.watch("amount") || "0.00"} {crypto.symbol}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Network Fee</span>
                          <span>~0.0005 {crypto.symbol}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>You will receive</span>
                          <span>
                            {(() => {
                              const amount = parseFloat(form.watch("amount") || "0");
                              const fee = 0.0005;
                              return isNaN(amount) ? "0.00" : Math.max(0, amount - fee).toFixed(5);
                            })()} {crypto.symbol}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                        <p className="font-medium mb-1">Important:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Always double-check the withdrawal address</li>
                          <li>Withdrawals cannot be reversed once processed</li>
                          <li>Minimum withdrawal: 0.001 {crypto.symbol}</li>
                        </ul>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <Wallet className="h-4 w-4 mr-2" />
                        Withdraw {crypto.symbol}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </PageContainer>
  );
}
